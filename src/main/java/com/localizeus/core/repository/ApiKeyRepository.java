package com.localizeus.core.repository;

import com.localizeus.core.domain.ApiKey;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ApiKey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApiKeyRepository extends JpaRepository<ApiKey, Long> {

    @Query("select apiKey from ApiKey apiKey where apiKey.user.login = ?#{principal.username}")
    List<ApiKey> findByUserIsCurrentUser();
}
