import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import PropTypes from "prop-types";
import getConfig from "next/config";
import { connect } from "react-redux";
import "../styles/_navbar-top-header.scss";
import BurgerMenu from "./images/burger-menu";

const NavBarTop = ({ isSignedIn }) => {
  const { publicRuntimeConfig } = getConfig();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand='md' fixed='top'>
        <NavbarBrand href={publicRuntimeConfig.primaryDomain}>
          <img
            src={`${publicRuntimeConfig.primaryDomain}/static/images/logo-sharp.svg`}
            className='App-logo'
            alt='logo'
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle}>
          <BurgerMenu />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink className='nav-link' href='/buy/'>
                Buy a Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/seller/add-new-property'>Sell a Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/dashboard/resources'>Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/blog'>Blogs</NavLink>
            </NavItem>
          </Nav>

          <Nav>
            <NavItem>
              <NavLink id='left-link' href='/login'>
                Login
              </NavLink>
            </NavItem>
            <div id='divider'></div>
            <NavItem>
              <NavLink href='/sign-up'>Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBarTop.propTypes = {
  isSignedIn: PropTypes.bool,
  signOut: PropTypes.func,
  headerStyle: PropTypes.string,
  loading: PropTypes.bool,
  user: PropTypes.object,
  isNotification: PropTypes.bool,
  chatRooms: PropTypes.array,
};

export default connect(null, null)(NavBarTop);
