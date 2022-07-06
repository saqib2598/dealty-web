import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';
import Head from 'next/head';

import { selectResources, retrieveResources } from '../../modules/resources';
import Layout from '../../components/Layout';

const videos = (props) => {
  useEffect(() => {
    const { retrieveResources } = props;
    retrieveResources('video=true');
  }, []);

  const { resources } = props
  return (
    <Layout bodyBg='light' headerStyle='teal' footerStyle='white'>
      <Head>
        <title>Videos</title>
      </Head>
      <div className='video-resource'>
        <Container>
          <p>Videos</p>
          <Row>
            {resources.length > 0 ? (
              resources.map((video) => (
                <Col
                  key={video.uploadUrl}
                  xs='12'
                  sm='6'
                  lg='4'
                  className='d-flex align-items-stretch mt-4'
                >
                  <div className='box'>
                    <h1 className='video label'>{video.name}</h1>
                    <video controls style={{ width: '100%' }}>
                      <source src={video.uploadUrl} />
                      Your browser does not support HTML5 video.
                    </video>
                    <div className='video description'>{video.description}</div>
                  </div>
                </Col>
              ))
            ) : (
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '30px',
                }}
              >
                <h1>There is no video added yet</h1>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

videos.propTypes = {
  retrieveResources: PropTypes.func.isRequired,
  resources: PropTypes.array,
};

const mapDispatchToProps = { retrieveResources };
const mapStateToProps = (state) => ({
  resources: selectResources(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(videos);
