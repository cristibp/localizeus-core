package com.localizeus.core.repository;

import com.localizeus.core.domain.Translation;

import com.localizeus.core.domain.TranslationKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Translation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranslationRepository extends JpaRepository<Translation, Long> {
    List<Translation> findAllByTranslationKeyId(Long id);

}
