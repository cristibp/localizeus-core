package com.localizeus.core.facade.impl;

import com.localizeus.core.facade.KeyManagementViewFacade;
import com.localizeus.core.service.KeyLabelService;
import com.localizeus.core.service.TranslationKeyService;
import com.localizeus.core.service.TranslationService;
import com.localizeus.core.service.dto.KeyManagementViewDTO;
import com.localizeus.core.service.dto.TranslationDTO;
import com.localizeus.core.service.dto.TranslationKeyDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class KeyManagementViewFacadeImpl implements KeyManagementViewFacade {

    private final TranslationKeyService translationKeyService;
    private final TranslationService translationService;
    private final KeyLabelService keyLabelService;

    public KeyManagementViewFacadeImpl(TranslationKeyService translationKeyService, TranslationService translationService, KeyLabelService keyLabelService) {
        this.translationKeyService = translationKeyService;
        this.translationService = translationService;
        this.keyLabelService = keyLabelService;
    }

    @Override
    public Page<KeyManagementViewDTO> getKeyManagementView(Long projectId, Pageable pageable) {
        List<KeyManagementViewDTO> keyManagementViewDTOList = new ArrayList<>();
        Page<TranslationKeyDTO> allTranslationKeysByProjectId = translationKeyService.findAllByProjectId(projectId, pageable);
        for (TranslationKeyDTO translationKeyDTO : allTranslationKeysByProjectId.getContent()) {
            List<TranslationDTO> allTranslationsForKey = translationService.findAll(translationKeyDTO.getId());
            KeyManagementViewDTO keyManagementViewDTO = new KeyManagementViewDTO(translationKeyDTO, allTranslationsForKey);
            keyManagementViewDTO.setLabels(keyLabelService.findAllForTranslationKey(translationKeyDTO.getId()));
            keyManagementViewDTOList.add(keyManagementViewDTO);
        }
        return new PageImpl<>(keyManagementViewDTOList, pageable, allTranslationKeysByProjectId.getTotalElements());
    }
}
