package com.localizeus.core.config.multitenant;

import org.apache.commons.lang3.RandomStringUtils;

import java.util.Base64;

public class MultiTenantContext {
    public static final String TENANT_ID = "tenant_id";
    public static final String DEFAULT_CONFIGURATION_TENANT = "config";
    public static final String SUPER_USER_TENANT = "SU";

    private static final ThreadLocal<String> CONTEXT = new ThreadLocal<>();
    public static final String ENCODING_SEPAPARATOR = "_";

    public static void setTenantId(String tenantId) {
        CONTEXT.set(tenantId);
    }

    public static String getTenantId() {
        return CONTEXT.get();
    }

    public static String encode() {
        return new String(Base64.getEncoder().encode((getTenantId() + ENCODING_SEPAPARATOR + RandomStringUtils.randomAlphanumeric(5)).getBytes()));
    }

    public static String decode(String data) {
        String content = new String(Base64.getDecoder().decode(data));
        if (!content.contains(ENCODING_SEPAPARATOR)) {
            throw new IllegalArgumentException("Invalid data to process");
        }
        return content.split(ENCODING_SEPAPARATOR)[0];
    }

    public static void clear() {
        CONTEXT.remove();
    }
}
