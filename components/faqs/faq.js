import React from 'react'
import { Row, Col } from 'reactstrap'
import Faq from "react-faq-component";

const FaqForm = ({data, message}) => {
  const styles = {
    rowTitleColor: 'black',
    rowContentColor: 'grey',
    rowContentPaddingBottom: '10px'
  };

  const config = {
    animate: true,
  };
  return (
    <>
      <Col>
        <div className="wrapper lg">
          {data.rows.length > 0 ?
            <Faq data={data} styles={styles} config={config} />
            :
            <center><strong>{message}</strong></center>
          }
        </div>
      </Col>
      <style jsx>{`
        @media only screen and (max-width: 767px) {
          :global(.wrapper) {
            margin-top: 20px
          }
        }
    `}</style>
    </>
  )
}

export default FaqForm
