package com.localizeus.core.service.dto;

import java.io.Serializable;
import com.localizeus.core.domain.enumeration.PermissionType;

/**
 * A DTO for the {@link com.localizeus.core.domain.UserPermission} entity.
 */
public class UserPermissionDTO implements Serializable {
    
    private Long id;

    private PermissionType type;


    private Long userId;

    private Long projectId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PermissionType getType() {
        return type;
    }

    public void setType(PermissionType type) {
        this.type = type;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
        if (!(o instanceof UserPermissionDTO)) {
            return false;
        }

        return id != null && id.equals(((UserPermissionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserPermissionDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", userId=" + getUserId() +
            ", projectId=" + getProjectId() +
            "}";
    }
}
