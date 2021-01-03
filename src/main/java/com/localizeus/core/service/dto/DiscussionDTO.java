package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.Discussion} entity.
 */
public class DiscussionDTO implements Serializable {
    
    private Long id;

    private String value;


    private Long projectId;
    
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
        if (!(o instanceof DiscussionDTO)) {
            return false;
        }

        return id != null && id.equals(((DiscussionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiscussionDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", projectId=" + getProjectId() +
            "}";
    }
}
