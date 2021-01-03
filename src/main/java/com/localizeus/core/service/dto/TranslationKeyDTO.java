package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.TranslationKey} entity.
 */
public class TranslationKeyDTO implements Serializable {
    
    private Long id;

    private String name;

    private String fallbackValue;


    private Long projectId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFallbackValue() {
        return fallbackValue;
    }

    public void setFallbackValue(String fallbackValue) {
        this.fallbackValue = fallbackValue;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TranslationKeyDTO)) {
            return false;
        }

        return id != null && id.equals(((TranslationKeyDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TranslationKeyDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fallbackValue='" + getFallbackValue() + "'" +
            ", projectId=" + getProjectId() +
            "}";
    }
}
