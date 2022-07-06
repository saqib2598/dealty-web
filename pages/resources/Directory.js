import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withRouter } from 'next/router';
import param from 'jquery-param';
import { Row, Col, Button, Container } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { capitalize } from 'lodash';
import MediaQuery from 'react-responsive';
import { Scrollbars } from 'react-custom-scrollbars';

import { filterForm } from '../../components/resources/Directory/FilterForm';
import UserImage from '../../components/UserImage';
import { Link } from '../../routes';
import Loading from '../../components/Loading';
import {
  NameWrap,
  EmailWrap,
  DetailsWrap,
  FiltersWrap,
} from '../../components/resources/Directory/DirectoryStyles';
import Layout from '../../components/Layout';
import { getTitle } from '../../components/buyer/home/helpers/ListingsHelper';
import { retrieveSpecificUsers } from '../../modules/users';
import { directoryTypes } from '../../static/data/home_constants';

class Directory extends Component {
  state = {
    loading: false,
    dirty: false,
    activePage: 1,
    filters: {},
  };

  async componentDidMount() {
    const { retrieveSpecificUsers } = this.props;
    const type = this.props.router.query.type;
    type == directoryTypes.loanOfficer
      ? await retrieveSpecificUsers(`user_type=${type}`)
      : await retrieveSpecificUsers(`seller_type=${type}`);
  }

  handleSubmit = (formState) => {
    this.setState({ loading: true})
    this.setState({ filters: formState });
    this.retrieveUsers();
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.retrieveUsers();
  }

  retrieveUsers = () => {
    setTimeout(async () => {
      const { activePage, filters } = this.state;
      const { retrieveSpecificUsers } = this.props;
      const type = this.props.router.query.type;
      const params = param(filters);
      const queryParams = `seller_type=${type}&page=${activePage}&${params}`;
      await retrieveSpecificUsers(queryParams);
      params > 0 ? this.setState({ loading: false, dirty: true }) :
      this.setState({ loading: false, dirty: false });
    }, 1500);
  };

  render() {
    const { filteredUsers, totalCount } = this.props;
    const { loading, dirty, activePage } = this.state;
    const type = this.props.router.query.type;
    return (
      <Layout bodyBg='light' headerStyle='teal' footerStyle='white'>
        <Container fluid>
          <div className='directory-resource'>
            <p className='heading'>{getTitle(type)}</p>
            {type !== directoryTypes.loanOfficer && (
              <Form onSubmit={this.handleSubmit} component={filterForm} />
            )}
            {loading ? (
              <Loading />
            ) : (
              <Row className='pt-4 directory'>
                {filteredUsers &&
                  filteredUsers.map((user) => (
                    <Col
                      xs='12'
                      sm='4'
                      lg='3'
                      className='d-flex align-items-stretch mt-4 some-class'
                      key={user.id}
                    >
                      <div className='card'>
                        <UserImage img={user.image} />
                        <h5 className='mt-4' style={NameWrap}>
                          {capitalize(user.firstName) +
                            ' ' +
                            capitalize(user.middleName) +
                            ' ' +
                            capitalize(user.lastName)}
                        </h5>
                        <div style={EmailWrap}>{user.email}</div>
                        <br />
                        <MediaQuery minWidth={768}>{user.phone}</MediaQuery>
                        <br />
                        <Scrollbars className='mt-3' style={DetailsWrap}>
                          {user.sellerDetails &&
                            user.sellerDetails.map((d) => d.state).join(', ')}
                        </Scrollbars>
                        {(type === directoryTypes.agent || type === directoryTypes.loanOfficer) && (
                          <Link
                            route={
                              type === directoryTypes.loanOfficer
                                ? `/officer/${user.firstName}-${user.lastName}-${user.id}`
                                : `/seller/${user.id}`
                            }
                            passHref
                          >
                            <Button className={`primary ${user.state && 'disabled'}`}>
                              View Profile
                            </Button>
                          </Link>
                        )}
                      </div>
                    </Col>
                  ))}
                <div style={FiltersWrap}>
                  {filteredUsers && filteredUsers.length === 0 && !loading ? (
                    !dirty ? (
                      <h3>Please adjust filters to narrow your search</h3>
                    ) : (
                      <h3>No matching result found</h3>
                    )
                  ) : null}
                </div>
                {type !== directoryTypes.loanOfficer && (
                  <div className='pagination-container'>
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={20}
                      totalItemsCount={totalCount || 0}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </div>
                )}
              </Row>
            )}
          </div>
        </Container>
      </Layout>
    );
  }
}

Directory.propTypes = {
  retrieveSpecificUsers: PropTypes.func.isRequired,
  filteredUsers: PropTypes.array,
  type: PropTypes.string.isRequired,
  totalCount: PropTypes.number,
};

const mapDispatchToProps = { retrieveSpecificUsers };
const mapStateToProps = (state) => ({
  filteredUsers: state.users.filteredUsers.filteredUsers,
  totalCount: state.users.filteredUsers.totalCount,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Directory));
