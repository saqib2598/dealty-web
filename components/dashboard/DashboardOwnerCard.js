import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle
} from 'reactstrap';

import { Router } from '../../routes';
import { FormatPhone } from '../buyer/home/helpers/ListingsHelper';

export const DashboardOwnerCard = ({ user }) => {
  const image = () => {
    return user.image ? user.image : '/static/images/user_account_pic.png';
  };

  return (
    <div className='dashboard-owner-card'>
      <Card>
        <CardImg top className='user-image' src={image()} alt='User Icon' />
        <CardBody>
          <CardTitle>
            <strong className='seller-name'>
              {`${user.firstName} ${user.lastName}`}
            </strong>
          </CardTitle>
          <CardText>{FormatPhone(user.phone)}</CardText>
          <CardText>{user.email}</CardText>
          <Button onClick={() => Router.push('my-account')}>
            Edit Profile
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

DashboardOwnerCard.propTypes = {
  user: PropTypes.object.isRequired
};
