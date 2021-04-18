package com.localizeus.core.service;

import com.localizeus.core.service.dto.TranslationKeyDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.TranslationKey}.
 */
public interface TranslationKeyService {

    /**
     * Save a translationKey.
     *
     * @param translationKeyDTO the entity to save.
     * @return the persisted entity.
     */
    TranslationKeyDTO save(TranslationKeyDTO translationKeyDTO);

    /**
     * Get all the translationKeys.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TranslationKeyDTO> findAll(Pageable pageable);


    /**
     * Get all the translationKeys.
     *
     * @param projectId the project id
     * @param translationKey the translation key to search for
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TranslationKeyDTO> findAllByProjectIdAndTranslationKey(Long projectId, String translationKey, Pageable pageable);

    /**
     * Get the "id" translationKey.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TranslationKeyDTO> findOne(Long id);

    /**
     * Delete the "id" translationKey.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
