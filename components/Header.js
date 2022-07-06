import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import {Router} from '../routes';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../styles/_navbar-top-header.scss';
import BurgerMenu from './images/burger-menu';
import {capitalize} from 'lodash';
import {NAV_TOP_OPTIONS, NAV_DROPDOWN_OPTIONS} from '../static/data/constants';

const CustomNavItem = ({link, label, id}) => {
  return (
    <NavItem>
      <NavLink id={id} onClick={() => label==='Rent' ?
        Router.push({
          pathname: link,
          query: {filter: 'rental'},
        }) :
        Router.pushRoute(link)}>
        {label}
      </NavLink>
    </NavItem>
  );
};
const NavTopOptions = ({optionsList, isSignedIn}) => {
  return (
    <Nav className='mr-auto' navbar>
      {isSignedIn && <CustomNavItem link='/dashboard' label='Dashboard' />}
      {optionsList.map((option) => (
        <CustomNavItem link={option.link} label={option.label} />
      ))}
    </Nav>
  );
};
const DropdownOptions = ({optionsList, user, signOut, isSignedIn}) => {
  return (
    isSignedIn &&
    <Nav>
      <NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret id='nav-dropdown' className='user-avatar'>
            <a>{capitalize(user.firstName)}</a>
          </DropdownToggle>
          <DropdownMenu right>
            {optionsList.map((option) => (
              <DropdownItem href={option.link}>{option.label}</DropdownItem>
            ))}
            <DropdownItem onClick={signOut}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </NavItem>
    </Nav>
  );
};
const NavTopLeftOptions = ({isSignedIn}) => {
  return (
    !isSignedIn &&
    <Nav>
      <CustomNavItem id='left-link' link='/login' label='Login' />
      <div id='divider'/>
      <CustomNavItem link='/sign-up' label='Sign Up' />
    </Nav>
  );
};

export const SiteHeader = ({isSignedIn, signOut, user}) => {
  const {publicRuntimeConfig} = getConfig();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar expand='md' fixed='top'>
        <NavbarBrand href={publicRuntimeConfig.primaryDomain}>
          <img
            src={`${publicRuntimeConfig.primaryDomain}/static/images/logo-sharp.svg`}
            id='App-logo'
            alt='logo'
          />
        </NavbarBrand>
        <Fragment>
          <NavbarToggler onClick={toggle}>
            <BurgerMenu />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <NavTopOptions optionsList={NAV_TOP_OPTIONS} isSignedIn={isSignedIn} />
            <DropdownOptions optionsList={NAV_DROPDOWN_OPTIONS} user={user} signOut={signOut} isSignedIn={isSignedIn} />
            <NavTopLeftOptions isSignedIn={isSignedIn} />
          </Collapse>
        </Fragment>
      </Navbar>
    </React.Fragment>
  );
};

SiteHeader.propTypes = {
  isSignedIn: PropTypes.bool,
  signOut: PropTypes.func,
  headerStyle: PropTypes.string,
  user: PropTypes.object,
};
NavTopOptions.propTypes = {
  optionsList: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
  ).isRequired,
  isSignedIn: PropTypes.bool,
};
DropdownOptions.propTypes = {
  optionsList: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
  ).isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
NavTopLeftOptions.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};
CustomNavItem.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
};
