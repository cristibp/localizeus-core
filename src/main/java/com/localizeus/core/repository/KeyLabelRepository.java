package com.localizeus.core.repository;

import com.localizeus.core.domain.KeyLabel;

import com.localizeus.core.domain.Translation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the KeyLabel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeyLabelRepository extends JpaRepository<KeyLabel, Long> {
    List<KeyLabel> findAllByTranslationKeyId(Long id);

}
