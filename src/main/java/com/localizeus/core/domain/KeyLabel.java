package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.localizeus.core.domain.annotation.LogicalDeletion;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A KeyLabel.
 */
@Entity
@Table(name = "key_label")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@LogicalDeletion
@Where(clause = "deleted=false")
public class KeyLabel extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties(value = "keyLabels", allowSetters = true)
    private TranslationKey translationKey;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public KeyLabel value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public TranslationKey getTranslationKey() {
        return translationKey;
    }

    public KeyLabel translationKey(TranslationKey translationKey) {
        this.translationKey = translationKey;
        return this;
    }

    public void setTranslationKey(TranslationKey translationKey) {
        this.translationKey = translationKey;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KeyLabel)) {
            return false;
        }
        return id != null && id.equals(((KeyLabel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KeyLabel{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
