package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.localizeus.core.domain.enumeration.ProjectActions;

/**
 * A ProjectHistory.
 */
@Entity
@Table(name = "project_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProjectHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "action")
    private ProjectActions action;

    @Column(name = "old_value")
    private String oldValue;

    @Column(name = "new_value")
    private String newValue;

    @ManyToOne
    @JsonIgnoreProperties(value = "projectHistories", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "projectHistories", allowSetters = true)
    private TranslationKey translationkey;

    @ManyToOne
    @JsonIgnoreProperties(value = "projectHistories", allowSetters = true)
    private Translation translation;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProjectActions getAction() {
        return action;
    }

    public ProjectHistory action(ProjectActions action) {
        this.action = action;
        return this;
    }

    public void setAction(ProjectActions action) {
        this.action = action;
    }

    public String getOldValue() {
        return oldValue;
    }

    public ProjectHistory oldValue(String oldValue) {
        this.oldValue = oldValue;
        return this;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public ProjectHistory newValue(String newValue) {
        this.newValue = newValue;
        return this;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public User getUser() {
        return user;
    }

    public ProjectHistory user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TranslationKey getTranslationkey() {
        return translationkey;
    }

    public ProjectHistory translationkey(TranslationKey translationKey) {
        this.translationkey = translationKey;
        return this;
    }

    public void setTranslationkey(TranslationKey translationKey) {
        this.translationkey = translationKey;
    }

    public Translation getTranslation() {
        return translation;
    }

    public ProjectHistory translation(Translation translation) {
        this.translation = translation;
        return this;
    }

    public void setTranslation(Translation translation) {
        this.translation = translation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectHistory)) {
            return false;
        }
        return id != null && id.equals(((ProjectHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectHistory{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", oldValue='" + getOldValue() + "'" +
            ", newValue='" + getNewValue() + "'" +
            "}";
    }
}
