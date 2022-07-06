import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import { CanonicalTag } from '../components/SEO/CanonicalTag';
import { Adsense } from '../components/Ads/Adsense';

const AboutItem = ({ title, paragraph, newParagraph }) => {
  return (
    <div className='about-us'>
      <div className='about-dealty-wrapper lg'>
        <h2 className='headings'>{title}</h2>
        <p>{paragraph}</p>
        <p>{newParagraph}</p>
      </div>
    </div>
  );
};

const CoreValues = ({ heading, content }) => {
  return (
    <p>
      <b className='core-values-font'>{heading}</b>
      {content}
    </p>
  );
};

const AboutUs = () => (
  <Layout headerStyle='teal' bodyBg='light' footerStyle='white'>
    <CanonicalTag title='About Dealty' link='https://yourdealty.com/about-dealty'/>
    <div className='beach-house'>
      <h5 className='centered'>About Us</h5>
    </div>
    <div className='aboutus-container'>
      <AboutItem
        title='WHY DEALTY'
        paragraph={`Dealty began as an idea in 2018 to provide a much needed change in the online Real Estate industry.
                Earning the trust of our users means everything to us. Our dedication to meeting the Real Estate needs
                of all users, agents, builders, sellers, and buyers  is real and we take it seriously.`}
        newParagraph='In a world of technology, we still value real people and their goals. We heard you, we are
                    building it and providing it for your Real Estate success.'
      />
      <AboutItem
        title='OUR FUTURE'
        paragraph='Dealty sees a future in Real Estate for everyone. First and foremost, Dealty is dedicated to always
               being an open platform for buyers to contact the lister directly.'
      />
      <AboutItem
        title='OUR MISSION'
        paragraph='To make Real Estate accessible to everyone. To create opportunity for everyone to achieve their Real
               Estate dreams.'
      />
      <AboutItem
        title='OUR VISION'
        paragraph='To be the one stop site providing you the tools to do real estate your way. Whether you are an agent or
               broker, a homeowner who buys or sells on your own, whether you are hiring an agent or becoming an agent,
               we want you to do it your way.'
      />
      <hr></hr>
      <div className='core-values'>
        <center>
          <h2 className='headings'>OUR CORE VALUES</h2>
        </center>
        <CoreValues
          heading='Honest Professionalism: '
          content='Doing business honestly with complete dedication to keeping an open platform.'
        />
        <CoreValues heading='Transparency: ' content='No hidden information.' />
        <CoreValues
          heading='Passion for Real Estate:'
          content=' We are
          passionate about Real Estate and we know many others are too, we want
          to fuel that passion and give everyone the opportunity to be
          successful in real estate.'
        />
        <CoreValues
          heading='Education in Real Estate:'
          content=' We believe in sharing Real Estate knowledge with everyone.'
        />
        <CoreValues
          heading='Change in the Industry: '
          content='Provide agents and consumers the freedom and the platform to conduct transactions their own way.'
        />
        <img
          src='static/images/about-dealty/core-values.png'
          className='responsive-img'
          alt='homes'
        />
        <Adsense/>
      </div>
    </div>
  </Layout>
);

AboutItem.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  newParagraph: PropTypes.string.isRequired,
};

CoreValues.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AboutUs;
