package com.localizeus.core.facade;

import com.localizeus.core.service.dto.KeyManagementViewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface KeyManagementViewFacade {
    Page<KeyManagementViewDTO> getKeyManagementView(Long projectId, Pageable pageable);

}
