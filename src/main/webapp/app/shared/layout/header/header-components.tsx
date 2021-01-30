import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);
export const CreateNewCompany = props => (
  <NavItem>
    <NavLink tag={Link} to="/account/register" className="d-flex align-items-center">
      <FontAwesomeIcon icon="folder-open"/>
      <span>
        <Translate contentKey="global.menu.new-company">New Company</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Localizeus</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);


export const Project = props => (
  <NavItem>
    <NavLink tag={Link} to="/project" className="d-flex align-items-center">
      <FontAwesomeIcon icon="folder-open"/>
      <span>
        <Translate contentKey="global.menu.entities.project">Project</Translate>
      </span>
    </NavLink>
  </NavItem>
);
