package com.localizeus.core.web.rest;

import com.localizeus.core.facade.KeyManagementViewFacade;
import com.localizeus.core.service.dto.KeyManagementViewDTO;
import io.github.jhipster.web.util.PaginationUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

/**
 * REST controller for managing {@link com.localizeus.core.domain.TranslationKey}.
 */
@RestController
@RequestMapping("/api")
public class KeyManagementViewResource {

    private final Logger log = LoggerFactory.getLogger(KeyManagementViewResource.class);

    private final KeyManagementViewFacade keyManagementViewFacade;

    public KeyManagementViewResource(KeyManagementViewFacade keyManagementViewFacade) {
        this.keyManagementViewFacade = keyManagementViewFacade;
    }

    /**
     * {@code GET  /key-management-view} : get all the translationKeys.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of translationKeys in body.
     */
    @GetMapping("/key-management-view")
    public ResponseEntity<List<KeyManagementViewDTO>> listKeyManagementView(
        @RequestParam(name = "projectId") String projectId,
        @RequestParam(name = "translationKey") String translationKey,
        Pageable pageable) {
        Page<KeyManagementViewDTO> page;
        if (StringUtils.isBlank(projectId)) {
            throw new IllegalArgumentException("Missing projectId");
        } else {
            log.debug("REST request to get a page of TranslationKeys");
            page = keyManagementViewFacade.getKeyManagementView(Long.parseLong(projectId), translationKey, pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
