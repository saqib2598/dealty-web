import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'reactstrap';

import { getColSize } from '../buyer/home/helpers/ListingsHelper';
import router from 'next/router';

export const UserAgent = ({ image, agent, firstName, lastName, showMap, company }) => {
  const onSellerClick = () =>{
    router.push(`/officer/${firstName}-${lastName}-${agent.userId}`);
  };

  return (
    <div
      className={`home-agent col-sm-6 col-xs-12 ${showMap ? `col-md-${getColSize()}` : 'col-lg-3'}`}
    >
      <Card onClick={onSellerClick} className={`home-listing-card ${showMap ? 'home-card' : 'home-card-no-map'}`}>
        <div className='agent-card-row'>
          <div className='agent-card-col-1'>
            {image ?
              <img src={image} /> :
              <img src={'../../static/images/lawyer_avatar.png'} />
            }
            <div className='agent-name'>
              {`${firstName} ${lastName}`}
            </div>
            <div className='agent-company'>
              {company}
            </div>
          </div>
          <div className='agent-card-col-2'>
            <div>
              FIND YOUR &nbsp;
              <span className='spanText'>
                PERFECT &nbsp; MORTAGE
              </span>
              &nbsp; SOLUTION!
              <hr className='line'></hr>
              <p className='agent-bio'>
                {agent.bio}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

UserAgent.propTypes = {
  image: PropTypes.string.isRequired,
  agent: PropTypes.array.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  showMap: PropTypes.bool.isRequired,
  company: PropTypes.string.isRequired,
};
