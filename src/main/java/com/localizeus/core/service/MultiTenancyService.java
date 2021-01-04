package com.localizeus.core.service;

import com.localizeus.core.config.multitenant.MultiTenantDataSourceService;
import com.localizeus.core.config.multitenant.TenantConfiguration;
import com.localizeus.core.web.rest.AccountResource;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.text.MessageFormat;

@Service
@Transactional
public class MultiTenancyService {
    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    @Value("${spring.application.name}")
    private String appName;

    private final MultiTenantDataSourceService multiTenantDataSourceService;

    public MultiTenancyService(MultiTenantDataSourceService multiTenantDataSourceService) {

        this.multiTenantDataSourceService = multiTenantDataSourceService;
    }

    public void createDatabase(String tenantId) {
        String databaseName = getDatabaseName(appName, tenantId);
        String sql = "create database " + databaseName;
        log.debug("creating database: {}", sql);
        multiTenantDataSourceService.executeUpdate(sql);
    }

    private String getDatabaseName(String appName, String tenantId) {
        return MessageFormat.format("{0}_{1}", appName, tenantId);
    }

    public Pair<String, String> createDatabaseUser(String tenantId) {
        //TODO: analyze this point as we cannot create user on a different host so it works only on the same machine
        String database = getDatabaseName(appName, tenantId);
        String user = tenantId + "_ALL";
        String password = generatePassword();
        multiTenantDataSourceService.executeUpdate(MessageFormat.format("CREATE USER \"{0}\"@'localhost' IDENTIFIED BY \"{1}\";", user, password));
        multiTenantDataSourceService.executeUpdate(MessageFormat.format(" GRANT ALL PRIVILEGES ON {0}.* To \"{1}\"@'localhost';", database, user));
        multiTenantDataSourceService.executeUpdate("FLUSH PRIVILEGES;");
        return Pair.of(user, password);
    }

    public String generatePassword() {
        return RandomStringUtils.randomAlphanumeric(20);
    }

    public TenantConfiguration addDatabaseConfig(String tenantId, String user, String password) {
        //TODO :::::: it might be included in a dropdown during the creation in order to facilitate an easy way to select different host/port
        String host = "localhost";
        String port = "3306";
        String dbName = getDatabaseName(appName, tenantId);
        String sql = MessageFormat.format("INSERT INTO {6}_config.tenant_config (tenant_id, user, password, db_name, host, port, activation_key) VALUES (\"{0}\", \"{1}\", \"{2}\", \"{3}\", \"{4}\", \"{5}\", \"\");", tenantId, user, password, dbName, host, port, appName);
        multiTenantDataSourceService.executeUpdate(sql);

        return new TenantConfiguration(tenantId, user, password, host, port, dbName);
    }

    public DataSource addNewConnection(TenantConfiguration tenantConfiguration) {
        return multiTenantDataSourceService.addNewConnection(tenantConfiguration);
    }
}
