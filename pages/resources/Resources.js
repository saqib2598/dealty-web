import React, { useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { selectResources, retrieveResources } from '../../modules/resources';
import Layout from '../../components/Layout';

const PDFIcon = () => (
  <img alt='PDF Icon' title='PDF Icon' src='/static/images/icon-file.svg' />
);

const resources = (props) => {
  useEffect(() => {
    const { retrieveResources } = props;
    retrieveResources('other=true');
  }, []);

  const { resources } = props;

  return (
    <Layout bodyBg='light' headerStyle='teal' footerStyle='white'>
      <Head>
        <title>Resources</title>
      </Head>
      <div className='pdf-resource'>
        <Container>
          <p className='heading'>Resources</p>
          {resources.map((resource) => (
            <div className='wrapper lg resource' key={resource.id}>
              <Row className='no-gutters' key={resource.id}>
                <Col xs='12' md='6'>
                  <span className='filename'>
                    <PDFIcon /> {resource.name}
                  </span>
                </Col>
                <Col xs='12' md='6' className='text-md-right'>
                  <a
                    className='btn btn-info'
                    href={resource.uploadUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    download
                  >
                    View
                  </a>
                </Col>
              </Row>
            </div>
          ))}
        </Container>
      </div>
    </Layout>
  );
};

resources.propTypes = {
  retrieveResources: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
};

const mapDispatchToProps = { retrieveResources };
const mapStateToProps = (state) => ({
  resources: selectResources(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(resources);
