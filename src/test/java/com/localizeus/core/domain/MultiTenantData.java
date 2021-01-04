package com.localizeus.core.domain;


import com.localizeus.core.web.rest.vm.LoginVM;

import static com.localizeus.core.config.TenantConfiguration.TEST_TENANT;

public class MultiTenantData {
    public static LoginVM aLoginVM() {
        LoginVM loginVM= new LoginVM();
        loginVM.setRememberMe(false);
        loginVM.setTenant(TEST_TENANT);
        return loginVM;
    }
}
