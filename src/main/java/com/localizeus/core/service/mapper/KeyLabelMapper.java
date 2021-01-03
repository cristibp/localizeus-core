package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.KeyLabelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link KeyLabel} and its DTO {@link KeyLabelDTO}.
 */
@Mapper(componentModel = "spring", uses = {TranslationKeyMapper.class})
public interface KeyLabelMapper extends EntityMapper<KeyLabelDTO, KeyLabel> {

    @Mapping(source = "translationKey.id", target = "translationKeyId")
    KeyLabelDTO toDto(KeyLabel keyLabel);

    @Mapping(source = "translationKeyId", target = "translationKey")
    KeyLabel toEntity(KeyLabelDTO keyLabelDTO);

    default KeyLabel fromId(Long id) {
        if (id == null) {
            return null;
        }
        KeyLabel keyLabel = new KeyLabel();
        keyLabel.setId(id);
        return keyLabel;
    }
}
