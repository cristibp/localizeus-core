package com.localizeus.core.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.core.env.Environment;

import java.util.concurrent.Executor;

public class AbstractLiquibaseChangelog {
    protected final Environment env;
    protected final Executor executor;
    protected final LiquibaseProperties liquibaseProperties;

    public AbstractLiquibaseChangelog(Environment env, @Qualifier("taskExecutor") Executor executor, LiquibaseProperties liquibaseProperties) {
        this.env = env;
        this.executor = executor;
        this.liquibaseProperties = liquibaseProperties;
    }
}
