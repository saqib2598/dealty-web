import React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  CardImg,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { Router } from '../../routes';
import { resourceCardData } from '../../static/data/home_constants';
import { Adsense } from '../../components/Ads/Adsense';

const ResourceCard = ({ resourceCard }) => {
  const changeRoute = () =>
    Router.push({
      pathname: resourceCard.route,
      query: { type: resourceCard.type },
    });
  return (
    <div>
      <Card className='resource-card' onClick={changeRoute}>
        <CardImg src={resourceCard.icon}></CardImg>
        <CardBody>
          <CardTitle>{resourceCard.title}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

export const ResourcesContainer = () => {
  return (
    <div className='resources-container'>
      <Container>
        <Row>
          {resourceCardData.map((resourceCard) => (
            <Col lg='4' md='6' sm='12'>
              <ResourceCard
                resourceCard={ resourceCard }
              />
            </Col>
          ))}
        </Row>
        <Adsense />
      </Container>
    </div>
  );
};

ResourceCard.propTypes = {
  resourceCard: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
};
