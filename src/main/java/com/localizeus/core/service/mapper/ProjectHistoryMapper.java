package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.ProjectHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProjectHistory} and its DTO {@link ProjectHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TranslationKeyMapper.class, TranslationMapper.class})
public interface ProjectHistoryMapper extends EntityMapper<ProjectHistoryDTO, ProjectHistory> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "translationkey.id", target = "translationkeyId")
    @Mapping(source = "translation.id", target = "translationId")
    ProjectHistoryDTO toDto(ProjectHistory projectHistory);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "translationkeyId", target = "translationkey")
    @Mapping(source = "translationId", target = "translation")
    ProjectHistory toEntity(ProjectHistoryDTO projectHistoryDTO);

    default ProjectHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProjectHistory projectHistory = new ProjectHistory();
        projectHistory.setId(id);
        return projectHistory;
    }
}
