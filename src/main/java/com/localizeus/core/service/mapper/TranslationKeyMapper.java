package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.TranslationKeyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TranslationKey} and its DTO {@link TranslationKeyDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface TranslationKeyMapper extends EntityMapper<TranslationKeyDTO, TranslationKey> {

    @Mapping(source = "project.id", target = "projectId")
    TranslationKeyDTO toDto(TranslationKey translationKey);

    @Mapping(source = "projectId", target = "project")
    TranslationKey toEntity(TranslationKeyDTO translationKeyDTO);

    default TranslationKey fromId(Long id) {
        if (id == null) {
            return null;
        }
        TranslationKey translationKey = new TranslationKey();
        translationKey.setId(id);
        return translationKey;
    }
}
