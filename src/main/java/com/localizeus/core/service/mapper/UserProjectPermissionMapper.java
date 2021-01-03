package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.UserProjectPermissionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserProjectPermission} and its DTO {@link UserProjectPermissionDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ProjectMapper.class, UserPermissionMapper.class})
public interface UserProjectPermissionMapper extends EntityMapper<UserProjectPermissionDTO, UserProjectPermission> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "userpermission.id", target = "userpermissionId")
    UserProjectPermissionDTO toDto(UserProjectPermission userProjectPermission);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "projectId", target = "project")
    @Mapping(source = "userpermissionId", target = "userpermission")
    UserProjectPermission toEntity(UserProjectPermissionDTO userProjectPermissionDTO);

    default UserProjectPermission fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserProjectPermission userProjectPermission = new UserProjectPermission();
        userProjectPermission.setId(id);
        return userProjectPermission;
    }
}
