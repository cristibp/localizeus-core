package com.localizeus.core.service;

import com.localizeus.core.config.multitenant.MultiTenantDataSourceService;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.LiquibaseException;
import liquibase.resource.ClassLoaderResourceAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;

@Component
public class LiquibaseTenantChangelog extends AbstractLiquibaseChangelog {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final MultiTenantDataSourceService multiTenantDataSourceService;


    public LiquibaseTenantChangelog(Environment env, MultiTenantDataSourceService multiTenantDataSourceService,
                                    @Qualifier("taskExecutor") Executor executor,
                                    LiquibaseProperties liquibaseProperties) {
        super(env, executor, liquibaseProperties);
        this.multiTenantDataSourceService = multiTenantDataSourceService;
    }

    public Map<String, Liquibase> applyChangelog() throws LiquibaseException, SQLException {
        return applyChangelog(Collections.emptyList());
    }

    public Map<String, Liquibase> applyChangelog(List<String> excludeTenants) throws LiquibaseException, SQLException {
        Map<String, Liquibase> tenantToLiquibaseResult = new HashMap<>();
        Map<String, DataSource> filteredDataSources = new HashMap<>();
        Map<String, DataSource> dataSourceMap = multiTenantDataSourceService.getDataSourceMap();

        if (excludeTenants == null || excludeTenants.isEmpty()) {
            filteredDataSources = dataSourceMap;
        } else {
            for (Map.Entry<String, DataSource> entry : dataSourceMap.entrySet()) {
                if (!excludeTenants.contains(entry.getKey())) {
                    filteredDataSources.put(entry.getKey(), entry.getValue());
                }
            }
        }
        for (Map.Entry<String, DataSource> entry : filteredDataSources.entrySet()) {
            log.info("Started to apply the liquibase for tenant {}", entry.getKey());
            Connection connection = entry.getValue().getConnection();
            Liquibase liquibase = applyChangelog(connection);

            tenantToLiquibaseResult.put(entry.getKey(), liquibase);
        }

        return tenantToLiquibaseResult;
    }

    public Liquibase applyChangelog(Connection connection) {
        JdbcConnection liquibaseConnection = new JdbcConnection(connection);
        Liquibase liquibase = null;
        try {
            liquibase = new Liquibase("config/liquibase/tenant/master.xml", new ClassLoaderResourceAccessor(), liquibaseConnection);
            liquibase.update(new Contexts(), new LabelExpression());
        } catch (LiquibaseException e) {
            e.printStackTrace();
            log.error("An exception occurred when applying changelog", e);
        }
        return liquibase;
    }
}
