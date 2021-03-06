package com.localizeus.core.service.dto;

import java.io.Serializable;
import com.localizeus.core.domain.enumeration.ProjectActions;

/**
 * A DTO for the {@link com.localizeus.core.domain.ProjectHistory} entity.
 */
public class ProjectHistoryDTO implements Serializable {
    
    private Long id;

    private ProjectActions action;

    private String oldValue;

    private String newValue;


    private Long userId;

    private Long translationKeyId;

    private Long translationId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProjectActions getAction() {
        return action;
    }

    public void setAction(ProjectActions action) {
        this.action = action;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTranslationKeyId() {
        return translationKeyId;
    }

    public void setTranslationKeyId(Long translationKeyId) {
        this.translationKeyId = translationKeyId;
    }

    public Long getTranslationId() {
        return translationId;
    }

    public void setTranslationId(Long translationId) {
        this.translationId = translationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectHistoryDTO)) {
            return false;
        }

        return id != null && id.equals(((ProjectHistoryDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectHistoryDTO{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", oldValue='" + getOldValue() + "'" +
            ", newValue='" + getNewValue() + "'" +
            ", userId=" + getUserId() +
            ", translationKeyId=" + getTranslationKeyId() +
            ", translationId=" + getTranslationId() +
            "}";
    }
}
