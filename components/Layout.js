import React from 'react'
import PropTypes from 'prop-types'

import { SiteFooter } from './Footer'
import { isSignedIn } from '../lib/session'
import SiteHeaderContainer from '../containers/SiteHeaderContainer'

const Layout = ({ children, bodyBg, headerStyle, footerStyle, isBuyer, isHome }) => (
  <div>
    <SiteHeaderContainer headerStyle={headerStyle} isBuyer={isBuyer} />
    <main role="main" className={`main-${bodyBg} ${isSignedIn() ? '' : 'not-signed-main'}`}>
      {children}
    </main>
    {
      !isHome ? <SiteFooter /> : null
    }
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
  bodyBg: PropTypes.oneOf(
    ['teal', 'dark', 'light', 'white', 'grey']
  ),
  headerStyle: PropTypes.oneOf(
    ['teal', 'dark', 'none', 'default']
  ),
  footerStyle: PropTypes.oneOf(
    ['teal', 'dark', 'white']
  ),
};

Layout.defaultProps = {
  bodyBg: 'teal',
  headerStyle: 'teal',
  footerStyle: 'teal',
};

export default Layout;
