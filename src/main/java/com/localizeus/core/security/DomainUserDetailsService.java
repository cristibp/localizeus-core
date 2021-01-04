package com.localizeus.core.security;

import com.localizeus.core.config.multitenant.MultiTenantContext;
import com.localizeus.core.domain.User;
import com.localizeus.core.repository.UserRepository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import javax.sql.DataSource;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {
    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final DataSource centralDataSource;

    private final UserRepository userRepository;

    public DomainUserDetailsService(DataSource centralDataSource, UserRepository userRepository) {
        this.centralDataSource = centralDataSource;
        this.userRepository = userRepository;
    }


    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        String tenantId = MultiTenantContext.getTenantId();
        log.debug("Authenticating {}/{}", tenantId, login);
        if (MultiTenantContext.SUPER_USER_TENANT.equalsIgnoreCase(tenantId)) {
            try {
                ResultSet resultSet = centralDataSource.getConnection().createStatement().executeQuery("select * from user_config");
                resultSet.first();
                String username = (String) resultSet.getObject("login");
                String password = (String) resultSet.getObject("password");
                return new org.springframework.security.core.userdetails.User(username, password, Collections.singletonList(new SimpleGrantedAuthority(AuthoritiesConstants.SUPER_USER)));

            } catch (SQLException e) {
                throw new IllegalArgumentException("An error occurred during the login using the SuperUser");
            }
        }
        if (new EmailValidator().isValid(login, null)) {
            return userRepository
                .findOneWithAuthoritiesByEmailIgnoreCase(login)
                .map(user -> createSpringSecurityUser(login, user))
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));
        }

        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        return userRepository
            .findOneWithAuthoritiesByLogin(lowercaseLogin)
            .map(user -> createSpringSecurityUser(lowercaseLogin, user))
            .orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user) {
        if (!user.getActivated()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }
        List<GrantedAuthority> grantedAuthorities = user
            .getAuthorities()
            .stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getName()))
            .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), grantedAuthorities);
    }
}
