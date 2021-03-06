package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring", uses = {TranslationKeyMapper.class})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {

    @Mapping(source = "translationKey.id", target = "translationKeyId")
    CommentDTO toDto(Comment comment);

    @Mapping(source = "translationKeyId", target = "translationKey")
    Comment toEntity(CommentDTO commentDTO);

    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
