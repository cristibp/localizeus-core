package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.UserPermissionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserPermission} and its DTO {@link UserPermissionDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ProjectMapper.class})
public interface UserPermissionMapper extends EntityMapper<UserPermissionDTO, UserPermission> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "project.id", target = "projectId")
    UserPermissionDTO toDto(UserPermission userPermission);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "projectId", target = "project")
    UserPermission toEntity(UserPermissionDTO userPermissionDTO);

    default UserPermission fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserPermission userPermission = new UserPermission();
        userPermission.setId(id);
        return userPermission;
    }
}
