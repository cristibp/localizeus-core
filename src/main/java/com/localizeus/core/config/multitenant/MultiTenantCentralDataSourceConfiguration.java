package com.localizeus.core.config.multitenant;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@EnableConfigurationProperties({DataSourceProperties.class})
public class MultiTenantCentralDataSourceConfiguration {

    final DataSourceProperties dataSourceProperties;

    public MultiTenantCentralDataSourceConfiguration(DataSourceProperties dataSourceProperties) {
        this.dataSourceProperties = dataSourceProperties;
    }

    @Bean
    DataSource centralDataSource() {
        return DataSourceBuilder
            .create()
            .username(dataSourceProperties.getUsername())
            .password(dataSourceProperties.getPassword())
            .url(dataSourceProperties.getUrl())
            .driverClassName(dataSourceProperties.getDriverClassName())
            .build();
    }
}
