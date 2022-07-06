import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'reactstrap';

import { Link } from '../routes';
import { SERVICES_OPTIONS, HELP_OPTIONS, LINK_OPTIONS, SOCIAL_LINKS } from '../static/data/constants';

const FooterAction = ({ route, title }) => {
  return (
    <Link route={route}>
      <Button>{title}</Button>
    </Link>
  );
};
const FooterOptions = ({ heading, optionsList }) => {
  return (
    <Col md={3} xs={6}>
      <h3>{heading}</h3>
      <ul className='footer_link'>
        {optionsList.map((option) => (
          <li key={option.label}>
            <Link route={option.route}>
              <a>{option.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Col>
  );
};
const FooterLinks = ({ optionsList }) => {
  return (
    <Col md={2} xs={12}>
      <ul className='footer_link footer_pages'>
        {optionsList.map((option) => (
          <li key={option.label}>
            <Link route={option.route}>
              <a>{option.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export const SiteFooter = () => (
  <div id='footer' className='footer-no-map'>
    <div className='footer-inner'>
      <Container>
        <Row>
          <Col md={4} col={12}>
            <div className='footer_widget'>
              <a href='/'>
                <img className='footer_logo' src='/static/images/location-images/footer_logo.svg' alt='footer logo' />
              </a>
              <p>Real Estate made simple for everyone.</p>
              <FooterAction title='Sell Now' route='/seller/add-new-property' />
              <FooterAction title='Buy Now' route='/buy' />
            </div>
          </Col>
          <FooterOptions heading='Services' optionsList={SERVICES_OPTIONS} />
          <FooterOptions heading='Help' optionsList={HELP_OPTIONS} />
          <FooterLinks optionsList={LINK_OPTIONS} />
        </Row>
      </Container>
    </div>
    <div className='footer_bottom'>
      <Container>
        <Row>
          <Col md={6}>
            <a href='/' className='logo_D'>
              <img src='/static/images/location-images/footer_logo_D.svg' alt='logo D' />
            </a>
            <span>©{new Date().getFullYear()} Dealty. All Rights Reserved</span>
            <span className='dealty-llc'>Dealty Real Estate Services, LLC holds a real estate brokerage license in Arizona.</span>
          </Col>
          <Col md={6}>
            <ul className='social_network'>
              {SOCIAL_LINKS.map((option) => (
                <li key={option.label}>
                  <a className={option.class} href={option.link}>
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

SiteFooter.propTypes = {
  footerStyle: PropTypes.string,
};
FooterAction.propTypes = {
  title: PropTypes.string,
  route: PropTypes.string,
};
FooterOptions.propTypes = {
  heading: PropTypes.string,
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
FooterLinks.propTypes = {
  optionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
