import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {Translate, translate} from 'react-jhipster';
import {NavDropdown} from './menu-components';

const accountMenuItemsAuthenticated = (
  <>
    <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const additionalAccountMenuItems = (
  <>
    <MenuItem icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
  </>
);

export const AccountMenu = ({isAuthenticated = false, isSuperUser = false, username = ""}) => (
  <NavDropdown icon="user" name={username} id="account-menu">
    {isAuthenticated ? isSuperUser ? (accountMenuItemsAuthenticated) :
      <React.Fragment>{accountMenuItemsAuthenticated}{additionalAccountMenuItems}</React.Fragment> : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;
