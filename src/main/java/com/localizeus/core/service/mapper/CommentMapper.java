package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring", uses = {TranslationKeyMapper.class})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {

    @Mapping(source = "translationkey.id", target = "translationkeyId")
    CommentDTO toDto(Comment comment);

    @Mapping(source = "translationkeyId", target = "translationkey")
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
