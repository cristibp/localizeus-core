package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Translation.
 */
@Entity
@Table(name = "translation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Translation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties(value = "translations", allowSetters = true)
    private TranslationKey translationkey;

    @ManyToOne
    @JsonIgnoreProperties(value = "translations", allowSetters = true)
    private Language language;

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

    public Translation value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public TranslationKey getTranslationkey() {
        return translationkey;
    }

    public Translation translationkey(TranslationKey translationKey) {
        this.translationkey = translationKey;
        return this;
    }

    public void setTranslationkey(TranslationKey translationKey) {
        this.translationkey = translationKey;
    }

    public Language getLanguage() {
        return language;
    }

    public Translation language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Translation)) {
            return false;
        }
        return id != null && id.equals(((Translation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Translation{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
