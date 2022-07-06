import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Row, Col, Container, Button } from 'reactstrap';

import Layout from '../../components/Layout';

const MortgageCalculator = dynamic(() => import('mortgage-calculator-react'), {
  ssr: false,
});

const calculator = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  return (
    <>
      <Layout bodyBg='light' headerStyle='teal' footerStyle='white'>
        <div className='calculator-resource'>
          <div className='calculator-image'>
            <div className='heading'>
              <p>Calculator</p>
            </div>
          </div>
          <div className='calulator-wrapper'>
            <Container>
              <Row className='calculator'>
                <Col className='calculator-column'>
                  <MortgageCalculator
                    showPaymentSchedule={showSchedule}
                    months={360}
                  />
                  <button
                    onClick={() => {
                      setShowSchedule(!showSchedule);
                    }}
                  >
                    {showSchedule ? 'Hide ' : 'Show '}Payment Schedule
                  </button>
                </Col>
                <Col className='estimate'>
                  <div className='content-box'>
                    <p className='heading'>Get A More Accurate Estimate</p>
                    <input placeholder='Enter Your Zip Code'></input>
                    <Button className='btn-meeting'>Get Pre-qualified </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default calculator;
