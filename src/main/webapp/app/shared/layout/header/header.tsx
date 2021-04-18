import './header.scss';

import React, {useState} from 'react';
import {Storage, Translate} from 'react-jhipster';
import {Collapse, Nav, Navbar, NavbarToggler} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import {Brand, CreateNewCompany, Home, Project} from './header-components';
import {AccountMenu, AdminMenu, EntitiesMenu, LocaleMenu} from '../menus';


export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperUser: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  username: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`}/>
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar"/>
      <Navbar dark expand="sm" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu}/>
        <Brand/>
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home/>
            {props.isAuthenticated && !props.isSuperUser && <Project/>}
            {props.isAuthenticated && props.isSuperUser && <CreateNewCompany/>}
            {props.isAuthenticated && !props.isSuperUser && props.isAdmin && <EntitiesMenu/>}
            {props.isAuthenticated && (props.isAdmin || props.isSuperUser) && (
              <AdminMenu showSwagger={props.isSwaggerEnabled} showUserManagement={!props.isSuperUser}/>
            )}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange}/>
            <AccountMenu isAuthenticated={props.isAuthenticated} isSuperUser={props.isSuperUser} username={props.username}/>

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
