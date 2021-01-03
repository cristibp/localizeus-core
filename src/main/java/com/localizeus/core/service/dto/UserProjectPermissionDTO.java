package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.UserProjectPermission} entity.
 */
public class UserProjectPermissionDTO implements Serializable {
    
    private Long id;


    private Long userId;

    private Long projectId;

    private Long userpermissionId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getUserpermissionId() {
        return userpermissionId;
    }

    public void setUserpermissionId(Long userPermissionId) {
        this.userpermissionId = userPermissionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProjectPermissionDTO)) {
            return false;
        }

        return id != null && id.equals(((UserProjectPermissionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProjectPermissionDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", projectId=" + getProjectId() +
            ", userpermissionId=" + getUserpermissionId() +
            "}";
    }
}
