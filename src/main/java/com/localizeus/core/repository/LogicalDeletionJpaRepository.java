package com.localizeus.core.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface LogicalDeletionJpaRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {
    <S extends T> S save(S entity);

    Page<T> findAllNotMarkedAsDeleted(Pageable var1);

    List<T> findAllNotMarkedAsDeleted();

    Page<T> findAllNotMarkedAsDeleted(Specification<T> spec, Pageable pageable);

    void forceDelete(T entity);
}
