package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.Translation} entity.
 */
public class TranslationDTO implements Serializable {
    
    private Long id;

    private String value;


    private Long translationKeyId;

    private Long languageId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getTranslationKeyId() {
        return translationKeyId;
    }

    public void setTranslationKeyId(Long translationKeyId) {
        this.translationKeyId = translationKeyId;
    }

    public Long getLanguageId() {
        return languageId;
    }

    public void setLanguageId(Long languageId) {
        this.languageId = languageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TranslationDTO)) {
            return false;
        }

        return id != null && id.equals(((TranslationDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TranslationDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", translationKeyId=" + getTranslationKeyId() +
            ", languageId=" + getLanguageId() +
            "}";
    }
}
