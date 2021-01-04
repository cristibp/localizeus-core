package com.localizeus.core.config.multitenant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class MultiTenantDataSourceService {
    private final Logger log = LoggerFactory.getLogger(MultiTenantDataSourceService.class);

    private final Map<String, DataSource> dataSourceMap = new LinkedHashMap<>();

    private final DataSource centralDataSource;

    public MultiTenantDataSourceService(DataSource centralDataSource) {
        this.centralDataSource = centralDataSource;
    }

    @PostConstruct
    public void loadDataSources() {
        try {
            ResultSet resultSet = centralDataSource.getConnection().createStatement().executeQuery("select * from tenant_config");
            while (resultSet.next()) {
                TenantConfiguration tenantConfiguration = new TenantConfiguration(
                    (String) resultSet.getObject(TenantConfiguration.TENANT_ID),
                    (String) resultSet.getObject(TenantConfiguration.USER),
                    (String) resultSet.getObject(TenantConfiguration.PASSWORD),
                    (String) resultSet.getObject(TenantConfiguration.HOST),
                    (String) resultSet.getObject(TenantConfiguration.PORT),
                    (String) resultSet.getObject(TenantConfiguration.DB_NAME)
                );
                dataSourceMap.put(tenantConfiguration.getTenantId(), createConnection(tenantConfiguration));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            log.error("An error occurred during the fetch of tenant configuration: ", e);
        }
    }

    private DataSource createConnection(TenantConfiguration tenantConfiguration) {
        return DataSourceBuilder.create()
            .url("jdbc:mysql://" + tenantConfiguration.getHost() + ":" + tenantConfiguration.getPort() + "/" + tenantConfiguration.getDbName())
            .username(tenantConfiguration.getUsername())
            .password(tenantConfiguration.getPasswordHash())
            .build();
    }

    public DataSource addNewConnection(TenantConfiguration tenantConfiguration) {
        DataSource connection = createConnection(tenantConfiguration);
        dataSourceMap.put(tenantConfiguration.getTenantId(), connection);

        return connection;
    }

    public void executeUpdate(String sql) {
        try (PreparedStatement preparedStatement = centralDataSource.getConnection().prepareStatement(sql)) {
            preparedStatement.executeUpdate();
        } catch (SQLException sqlException) {
            log.error("An error occurred during the execution of {}", sql, sqlException);
            throw new IllegalArgumentException("An unexpected error occurred ");
        }
    }

    public Map<String, DataSource> getDataSourceMap() {
        return Collections.unmodifiableMap(dataSourceMap);
    }
}
