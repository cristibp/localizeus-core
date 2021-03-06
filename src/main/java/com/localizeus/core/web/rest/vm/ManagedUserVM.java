package com.localizeus.core.web.rest.vm;

import com.localizeus.core.service.dto.UserDTO;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {
    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    @NotNull
    @Size(min = 2, max = 20)
    private String tenant;


    public ManagedUserVM() {
        // Empty constructor needed for Jackson.
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ManagedUserVM{" + super.toString() + "} ";
    }

    public String getTenant() {
        return tenant;
    }

    public ManagedUserVM setTenant(String tenant) {
        this.tenant = tenant;
        return this;
    }
}
