package com.localizeus.core.domain;

import com.localizeus.core.domain.annotation.LogicalDeletion;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Language.
 */
@Entity
@Table(name = "language")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@LogicalDeletion
@Where(clause = "deleted=false")
public class Language extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "language_name")
    private String languageName;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguageName() {
        return languageName;
    }

    public Language languageName(String languageName) {
        this.languageName = languageName;
        return this;
    }

    public void setLanguageName(String languageName) {
        this.languageName = languageName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Language)) {
            return false;
        }
        return id != null && id.equals(((Language) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", languageName='" + getLanguageName() + "'" +
            "}";
    }
}
