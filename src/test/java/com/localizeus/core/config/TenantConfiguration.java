package com.localizeus.core.config;

import com.localizeus.core.config.multitenant.MultiTenantContext;
import com.localizeus.core.service.LiquibaseTenantChangelog;
import liquibase.exception.LiquibaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.sql.SQLException;

@Configuration
public class TenantConfiguration {

    public static final String TEST_TENANT = "test_tenant";
    public static final String TEST_DB = "stocker_test";

    @Autowired
    private LiquibaseTenantChangelog tenantChangelog;

    @PostConstruct
    public void init() throws LiquibaseException, SQLException {
        MultiTenantContext.setTenantId(TEST_TENANT);
        tenantChangelog.applyChangelog();
    }
}
