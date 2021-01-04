package com.localizeus.core.config.multitenant;

import org.hibernate.engine.jdbc.connections.spi.AbstractDataSourceBasedMultiTenantConnectionProviderImpl;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;


public class MultiTenantConnectionProviderImpl extends AbstractDataSourceBasedMultiTenantConnectionProviderImpl {

    @Autowired
    private DataSource centralDataSource;

    @Autowired
    private MultiTenantDataSourceService multiTenantDataSourceService;


    @Override
    protected DataSource selectAnyDataSource() {
        return multiTenantDataSourceService.getDataSourceMap().values().iterator().next();
    }

    @Override
    protected DataSource selectDataSource(String tenantIdentifier) {
        if(MultiTenantContext.SUPER_USER_TENANT.equalsIgnoreCase(tenantIdentifier)) {
            return centralDataSource;
        }
        return multiTenantDataSourceService.getDataSourceMap().get(tenantIdentifier);
    }
}
