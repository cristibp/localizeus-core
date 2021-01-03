package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserProjectPermission.
 */
@Entity
@Table(name = "user_project_permission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserProjectPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "userProjectPermissions", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "userProjectPermissions", allowSetters = true)
    private Project project;

    @ManyToOne
    @JsonIgnoreProperties(value = "userProjectPermissions", allowSetters = true)
    private UserPermission userpermission;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public UserProjectPermission user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public UserProjectPermission project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public UserPermission getUserpermission() {
        return userpermission;
    }

    public UserProjectPermission userpermission(UserPermission userPermission) {
        this.userpermission = userPermission;
        return this;
    }

    public void setUserpermission(UserPermission userPermission) {
        this.userpermission = userPermission;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProjectPermission)) {
            return false;
        }
        return id != null && id.equals(((UserProjectPermission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProjectPermission{" +
            "id=" + getId() +
            "}";
    }
}
