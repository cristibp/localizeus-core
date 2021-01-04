package com.localizeus.core.config.multitenant;

public class TenantConfiguration {
    public static final String PASSWORD = "password";
    public static final String DB_NAME = "db_name";
    public static final String HOST = "host";
    public static final String PORT = "port";
    public static final String USER = "user";
    public static final String TENANT_ID = "tenant_id";

    private Long id;
    private String tenantId;
    private String username;
    private String password_hash;
    private String host;
    private String port;
    private String db_name;
    private String activationKey;

    public TenantConfiguration(String tenantId, String username, String password_hash, String host, String port, String db_name) {
        this.tenantId = tenantId;
        this.username = username;
        this.password_hash = password_hash;
        this.host = host;
        this.port = port;
        this.db_name = db_name;
    }

    public String getTenantId() {
        return tenantId;
    }

    public TenantConfiguration setTenantId(String tenantId) {
        this.tenantId = tenantId;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public TenantConfiguration setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPasswordHash() {
        return password_hash;
    }

    public TenantConfiguration setPasswordHash(String password_hash) {
        this.password_hash = password_hash;
        return this;
    }

    public String getHost() {
        return host;
    }

    public TenantConfiguration setHost(String host) {
        this.host = host;
        return this;
    }

    public String getPort() {
        return port;
    }

    public TenantConfiguration setPort(String port) {
        this.port = port;
        return this;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public TenantConfiguration setActivationKey(String activationKey) {
        this.activationKey = activationKey;
        return this;
    }
    public String getPassword_hash() {
        return password_hash;
    }

    public TenantConfiguration setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
        return this;
    }

    public String getDbName() {
        return db_name;
    }

    public TenantConfiguration setDbName(String db_name) {
        this.db_name = db_name;
        return this;
    }
}
