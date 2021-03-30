package com.localizeus.core.repository.impl;

import com.localizeus.core.domain.BaseEntity;
import com.localizeus.core.domain.annotation.LogicalDeletion;
import com.localizeus.core.repository.LogicalDeletionJpaRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;



public class LogicalDeletionJpaRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements LogicalDeletionJpaRepository<T, ID> {

    public LogicalDeletionJpaRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
    }

    public LogicalDeletionJpaRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager em) {
        super(entityInformation, em);
    }

    @Transactional
    @Override
    public <S extends T> S save(S entity) {
        return super.save(entity);
    }

    @Override
    public void delete(T entity) {
        if (entity instanceof BaseEntity) {
            ((BaseEntity) entity).setDeleted(true);
            save(entity);
        } else {
            super.delete(entity);
        }
    }

    @Override
    public void forceDelete(T entity) {
        super.delete(entity);
    }

    @Override
    public List<T> findAll() {
        if (getDomainClass().isAnnotationPresent(LogicalDeletion.class)) {
            return findAllNotMarkedAsDeleted();
        } else {
            return super.findAll();
        }
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return super.findAll(pageable);
    }

    @Override
    public List<T> findAllNotMarkedAsDeleted() {
        Specification<T> spec = (root, query, criteriaBuilder) -> root.get(BaseEntity.LOGICAL_DELETION_COLUMN).in(Boolean.FALSE);
        return super.findAll(spec);
    }

    @Override
    public Page<T> findAllNotMarkedAsDeleted(Pageable pageable) {
        Specification<T> spec = (root, query, criteriaBuilder) -> root.get(BaseEntity.LOGICAL_DELETION_COLUMN).in(Boolean.FALSE);
        return super.findAll(spec, pageable);
    }

    @Override
    public Page<T> findAllNotMarkedAsDeleted(Specification<T> spec, Pageable pageable) {
        Specification<T> logicalDeletionSpec = (root, query, criteriaBuilder) -> root.get(BaseEntity.LOGICAL_DELETION_COLUMN).in(Boolean.FALSE);
        logicalDeletionSpec.and(spec);
        return super.findAll(logicalDeletionSpec, pageable);
    }

    @Override
    public List<T> findAllById(Iterable<ID> ids) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public List<T> findAll(Sort sort) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public List<T> findAll(Specification<T> spec) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public Page<T> findAll(Specification<T> spec, Pageable pageable) {
        if (getDomainClass().isAnnotationPresent(LogicalDeletion.class)) {
            return findAllNotMarkedAsDeleted(spec, pageable);
        } else {
            return super.findAll(spec, pageable);
        }
    }

    @Override
    public List<T> findAll(Specification<T> spec, Sort sort) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public <S extends T> List<S> findAll(Example<S> example) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public <S extends T> List<S> findAll(Example<S> example, Sort sort) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public <S extends T> Page<S> findAll(Example<S> example, Pageable pageable) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public void deleteInBatch(Iterable<T> entities) {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }

    @Override
    public void deleteAllInBatch() {
        throw new IllegalArgumentException("Batch deletion not supported currently");
    }
}
