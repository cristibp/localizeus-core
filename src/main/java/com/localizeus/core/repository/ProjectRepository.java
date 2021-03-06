package com.localizeus.core.repository;

import com.localizeus.core.domain.Project;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends LogicalDeletionJpaRepository<Project, Long> {
}
