package com.localizeus.core.config.multitenant;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MultiTenantIdentifierResolverImpl implements CurrentTenantIdentifierResolver {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Override
    public String resolveCurrentTenantIdentifier() {
        String tenantId = MultiTenantContext.getTenantId();
        if (StringUtils.isBlank(tenantId)) {
            log.warn("The provided tenant id is blank!");
            return "local";//TODO Bypass this, on login page it comes with null
        }
        return tenantId;
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        //TODO recheck if we really have to do it
        return false;
    }
}
