package com.localizeus.core.repository;

import com.localizeus.core.domain.TranslationKey;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the TranslationKey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranslationKeyRepository extends JpaRepository<TranslationKey, Long> {
    Page<TranslationKey> findAllByProjectIdAndNameContainsAndDeletedIsFalse(Long id, String name, Pageable pageable);
}
