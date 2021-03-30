package com.localizeus.core.service.dto;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;
import java.util.List;

public class KeyManagementViewDTO implements Serializable {
    TranslationKeyDTO translationKey;
    List<TranslationDTO> translations;
    List<KeyLabelDTO> labels;

    public KeyManagementViewDTO(TranslationKeyDTO translationKey, List<TranslationDTO> translations) {
        this.translationKey = translationKey;
        this.translations = translations;
    }

    public TranslationKeyDTO getTranslationKey() {
        return translationKey;
    }

    public KeyManagementViewDTO setTranslationKey(TranslationKeyDTO translationKey) {
        this.translationKey = translationKey;
        return this;
    }

    public List<TranslationDTO> getTranslations() {
        return translations;
    }

    public KeyManagementViewDTO setTranslations(List<TranslationDTO> translations) {
        this.translations = translations;
        return this;
    }

    public List<KeyLabelDTO> getLabels() {
        return labels;
    }

    public KeyManagementViewDTO setLabels(List<KeyLabelDTO> labels) {
        this.labels = labels;
        return this;
    }
}
