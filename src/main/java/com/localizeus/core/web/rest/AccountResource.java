package com.localizeus.core.web.rest;

import com.localizeus.core.service.LiquibaseTenantChangelog;
import com.localizeus.core.service.MultiTenancyService;
import com.localizeus.core.domain.User;
import com.localizeus.core.repository.UserRepository;
import com.localizeus.core.security.AuthoritiesConstants;
import com.localizeus.core.security.SecurityUtils;
import com.localizeus.core.service.MailService;
import com.localizeus.core.service.UserService;
import com.localizeus.core.service.dto.PasswordChangeDTO;
import com.localizeus.core.service.dto.UserDTO;
import com.localizeus.core.web.rest.errors.*;
import com.localizeus.core.web.rest.vm.KeyAndPasswordVM;
import com.localizeus.core.web.rest.vm.ManagedUserVM;

import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import javax.validation.Valid;

import com.localizeus.core.config.multitenant.MultiTenantContext;
import com.localizeus.core.config.multitenant.TenantConfiguration;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final MailService mailService;

    private final MultiTenancyService multitenancyService;

    private final LiquibaseTenantChangelog tenantChangelog;

    public AccountResource(UserRepository userRepository, UserService userService, MailService mailService, MultiTenancyService multitenancyService, LiquibaseTenantChangelog tenantChangelog) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
        this.multitenancyService = multitenancyService;
        this.tenantChangelog = tenantChangelog;
    }

    /**
     * {@code POST  /register} : register the user.
     * <p>
     * when registering a new user we are actually have to perform the following actions:
     * 1. create a new database
     * 2. create a new user for that database
     * 3. include a new row in database config
     * 4. create the jhi_user for the newly created database with admin role
     * 5. apply liquibase for the new database
     * 6. send the activation email
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException  {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.SUPER_USER + "\")")
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) throws SQLException {
        if (!checkPasswordLength(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        String tenant = managedUserVM.getTenant();

        multitenancyService.createDatabase(tenant);

        Pair<String, String> dbCredentials = multitenancyService.createDatabaseUser(tenant);

        TenantConfiguration tenantConfiguration = multitenancyService.addDatabaseConfig(tenant, dbCredentials.getLeft(), dbCredentials.getRight());

        DataSource dataSource = multitenancyService.addNewConnection(tenantConfiguration);
        //do the rest
        MultiTenantContext.setTenantId(tenant);
        tenantChangelog.applyChangelog(dataSource.getConnection());
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
        mailService.sendActivationEmail(user);
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be activated.
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        String tenantId = MultiTenantContext.decode(key);
        MultiTenantContext.setTenantId(tenantId);
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this activation key");
        }
    }

    /**
     * {@code GET  /authenticate} : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    public UserDTO getAccount() {
        if (MultiTenantContext.SUPER_USER_TENANT.equalsIgnoreCase(MultiTenantContext.getTenantId())) {
            UserDTO userDTO = new UserDTO();
            userDTO.setLogin("admin");
            userDTO.setActivated(true);
            userDTO.setLangKey("en");
            userDTO.setAuthorities(Stream.of(AuthoritiesConstants.SUPER_USER, AuthoritiesConstants.ADMIN).collect(Collectors.toSet()));
            return userDTO;

        }
        return userService
            .getUserWithAuthorities()
            .map(UserDTO::new)
            .orElseThrow(() -> new AccountResourceException("User could not be found"));
    }

    /**
     * {@code POST  /account} : update the current user information.
     *
     * @param userDTO the current user information.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws RuntimeException          {@code 500 (Internal Server Error)} if the user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) {
        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(
            userDTO.getFirstName(),
            userDTO.getLastName(),
            userDTO.getEmail(),
            userDTO.getLangKey(),
            userDTO.getImageUrl()
        );
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (!checkPasswordLength(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
        Optional<User> user = userService.requestPasswordReset(mail);
        if (user.isPresent()) {
            mailService.sendPasswordResetMail(user.get());
        } else {
            // Pretend the request has been successful to prevent checking which emails really exist
            // but log that an invalid attempt has been made
            log.warn("Password reset requested for non existing mail");
        }
    }

    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws RuntimeException         {@code 500 (Internal Server Error)} if the password could not be reset.
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (!checkPasswordLength(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        String key = keyAndPassword.getKey();
        String tenantId = MultiTenantContext.decode(key);
        MultiTenantContext.setTenantId(tenantId);
        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), key);

        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this reset key");
        }
    }

    private static boolean checkPasswordLength(String password) {
        return (
            !StringUtils.isEmpty(password) &&
            password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
            password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH
        );
    }
}
