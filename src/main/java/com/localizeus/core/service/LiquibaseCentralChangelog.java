package com.localizeus.core.service;

import io.github.jhipster.config.liquibase.SpringLiquibaseUtil;
import liquibase.exception.LiquibaseException;
import liquibase.integration.spring.SpringLiquibase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.concurrent.Executor;

@Component
public class LiquibaseCentralChangelog extends AbstractLiquibaseChangelog{

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final DataSource centralDataSource;


    public LiquibaseCentralChangelog(Environment env, DataSource centralDataSource,
                                     @Qualifier("taskExecutor") Executor executor,
                                     LiquibaseProperties liquibaseProperties) {
        super(env, executor, liquibaseProperties);
        this.centralDataSource = centralDataSource;
    }

    public SpringLiquibase applyChangelog() throws LiquibaseException {
        log.info("Started to apply the liquibase to central database");

        SpringLiquibase liquibase = SpringLiquibaseUtil.createAsyncSpringLiquibase(this.env, executor, null, liquibaseProperties, centralDataSource, null);
        liquibase.setChangeLog("classpath:config/liquibase/central/master.xml");
        BeanUtils.copyProperties(liquibaseProperties, liquibase);

        liquibase.afterPropertiesSet();

        return liquibase;
    }
}
