import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  Row,
  Col,
  Modal,
} from 'reactstrap';

import DeleteListingModal from '../../components/modals/DeleteListing';
import { Link } from '../../routes';
import { removeCurrentUserListing } from '../../modules/users';
import { deleteListing } from '../../modules/listings';
import { mapFinalFormErrors } from '../../lib/utils';
import {
  isCompletePercentage1,
  isCompletePercentage2,
} from '../buyer/home/helpers/ListingsHelper';
import { ContactUsModal } from '../../components/modals/ContactUsModal';

const ListingActions = ({ icon, route }) => {
  return (
    <Col>
      <Link route={route}>
        <FontAwesomeIcon className='dashboard_icon' size='lg' icon={icon} />
      </Link>
    </Col>
  );
};

const DashboardListing = ({
  listing,
  questionCount1,
  questionCount2,
  questionCount3,
  deleteListing,
  removeCurrentUserListing,
}) => {
  let percentage1, percentage2, percentage3;
  let profileCompletionPercentage = 0.0;
  percentage2 = percentage3 = '100%';
  percentage1 =
    Math.floor((listing.confirmHomeInfo / questionCount1) * 100) + '%';

  if (listing.land) {
    percentage1 = Math.floor((listing.confirmHomeInfo / 4) * 100) + '%';
  } else {
    percentage2 =
      Math.floor((listing.otherHomeUpdates / questionCount2) * 100) + '%';
    percentage3 =
      Math.floor((listing.personalOpinion / questionCount3) * 100) + '%';
  }

  if (isCompletePercentage1(percentage1, listing))
    profileCompletionPercentage += 0.25;
  if (isCompletePercentage2(percentage2, listing))
    profileCompletionPercentage += 0.25;
  if (percentage3 === '100%') profileCompletionPercentage += 0.25;
  if (listing.appointment || listing.images.length > 0)
    profileCompletionPercentage += 0.25;

  const [deleteListingModalVisibility, setDeleteListingModalVisibility] = useState(false);
  const [contactUsModalVisibility, setContactUsModalVisibility] = useState(false);
  const mapErrors = mapFinalFormErrors('Failed to upload photo');

  const handleDelete = async () => {
    try {
      await deleteListing(listing.id).then(() => {
        () => setDeleteListingModalVisibility(false);
        removeCurrentUserListing(listing.id);
      });
    } catch (error) {
      return mapErrors(error);
    }
  };

  return (
    <>
      <DeleteListingModal
        isOpen={deleteListingModalVisibility}
        handleDelete={handleDelete}
        toggleDeleteListingModal={() => setDeleteListingModalVisibility(false)}
      />
      <ContactUsModal
        isOpen={contactUsModalVisibility}
        toggleContactUsModal={() => setContactUsModalVisibility(false)}
      />
      <Card className='dashboard_card'>
        <CardImg variant='top' src={listing.images[0]} />
        <CardBody>
          <CardTitle>
            <h5 className='mt-2'>
              {listing.address} {listing.address2 && `#${listing.address2}`}
            </h5>
          </CardTitle>
          <CardText>
            <hr className='dashed my-2' />
            {listing.price > 0 ? (
              <>
                <CurrencyFormat
                  value={listing.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <br />
              </>
            ) : (
              <div>No Price Data</div>
            )}
            <div>Views Count: {listing.views}</div>
            <hr className='dashed my-2' />

            <div>{Math.round(profileCompletionPercentage * 100)}% Complete</div>
          </CardText>
        </CardBody>
        <CardFooter>
          <Row>
            <ListingActions icon={faEye} route={`/buy/home/${listing.id}`} />
            {listing.source !== 'MLS' ? (
              <ListingActions
                icon={faEdit}
                route={`/seller/property/${listing.id}`}
              />
            ) : (
              <FontAwesomeIcon
                className='dashboard_icon'
                size='lg'
                icon={faEdit}
                onClick={() => setContactUsModalVisibility(true)}
              />
            )}
            <Col>
              <FontAwesomeIcon
                className='dashboard_icon'
                size='lg'
                icon={faTrash}
                onClick={() => setDeleteListingModalVisibility(true)}
              />
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </>
  );
};

DashboardListing.propTypes = {
  listing: PropTypes.object.isRequired,
  questionCount1: PropTypes.number.isRequired,
  questionCount2: PropTypes.number.isRequired,
  questionCount3: PropTypes.number.isRequired,
  deleteListing: PropTypes.func.isRequired,
  removeCurrentUserListing: PropTypes.func.isRequired,
};

const mapDispatchToProps = { deleteListing, removeCurrentUserListing };
export default connect(null, mapDispatchToProps)(DashboardListing);
