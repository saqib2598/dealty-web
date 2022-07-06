import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Link } from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert, Row, Col, Button } from 'reactstrap';

import homeInfoQuestions from '../../data/homeInfoQuestions.json';
import personalOpinionQuestions from '../../data/personalOpinion.json';
import otherHomeUpdatesQuestions from '../../data/otherHomeUpdates.json';
import UpdateAccountModal from '../../components/modals/UpdateAccount';
import DashboardListing from '../../components/dashboard/DashboardListing';
import { DashboardOwnerCard } from '../../components/dashboard/DashboardOwnerCard';
import { selectUser, retrieveUser } from '../../modules/users';

let DashboardContainer = class DashboardContainer extends React.Component {
  state = {
    updateAccountModalVisible: true,
    listingsAlert: false
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.seller && (find(user.seller.listings, { visibility: false })))
      this.setState({ listingsAlert: true });
  }

  toggleUpdateAccountModal = () => {
    this.setState((prevState) => {
      return {
        updateAccountModalVisible: !prevState.updateAccountModalVisible
      };
    });
  };

  Message = ({ message }) => {
    return (
      <>
        {message && (
          <Alert color='success' className='text-center'>
            {message}
          </Alert>
        )}
      </>
    );
  };

  Alert = ({ alert }) => {
    return (
      <Fragment>
        {alert && (
          <Alert color='info' className='text-center'>
            Inactive listings are open to be claimed and not shown in searches
            <br />
            Listing will be automatically activated if you{' '}
            <Link route='/plans'>subscribe</Link> to a plan
          </Alert>
        )}
      </Fragment>
    );
  };

  render() {
    const {
      user,
      router: {
        query: { message }
      }
    } = this.props;
    const { updateAccountModalVisible, listingsAlert } = this.state;
    const questionCount1 = homeInfoQuestions.length;
    const questionCount2 = otherHomeUpdatesQuestions.length;
    const questionCount3 = personalOpinionQuestions.length;

    if (user.seller === undefined) {
      return null;
    } else {
      return (
        <div className='dashboard-container justify-content-md-center' fluid>
          {user.email.startsWith('dealty') && (
            <UpdateAccountModal
              isOpen={updateAccountModalVisible}
              toggleUpdateAccountModal={this.toggleUpdateAccountModal}
            />
          )}
          <this.Message message={message} />
          <this.Alert alert={listingsAlert} />
          <div className='dashboard-item-1'>
            <DashboardOwnerCard user={user} />
          </div>
          <div className='dashboard-item-2'>
            {
              <Link route='/seller/add-new-property'>
                <Button className='add-property-button'>
                  <FontAwesomeIcon
                    className='dashboard_add_icon'
                    size='lg'
                    icon={faPlusCircle}
                  />
                  Add New Property
                </Button>
              </Link>
            }
            {user.seller && user.seller.listings.length ? (
              <ul className='listings-list'>
                <Row className='justify-content-md-center dashboard-row'>
                  <Fragment>
                    {user.seller.listings.map((listing) => (
                      <Col
                        key={listing.id}
                        xs='auto'
                        sm='auto'
                        md='auto'
                        lg='auto'
                        className='d-flex align-items-stretch mt-4'
                      >
                        <li>
                          <DashboardListing
                            listing={listing}
                            questionCount1={questionCount1}
                            questionCount2={questionCount2}
                            questionCount3={questionCount3}
                          />
                        </li>
                      </Col>
                    ))}
                  </Fragment>
                </Row>
              </ul>
            ) : (
              <h3>Your Future Listings Will Show Here</h3>
            )}
          </div>
        </div>
      );
    }
  }
};

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

const mapDispatchToProps = { retrieveUser };
const mapStateToProps = (state) => ({
  user: selectUser(state)
});
DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);

export default withRouter(DashboardContainer);
