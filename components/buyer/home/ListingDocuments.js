import React from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from '../../../routes'
import { Scrollbars } from 'react-custom-scrollbars';

const ListingDocuments = (props) => {
  return (
    <Scrollbars style={{ height: 300 }}>
      <Row style={{margin: '10px'}}>
        {props.documents.map((document, id) => (
          <Col xs="6" sm="2" className="mb-4" key={id}>
            <Link route ={document.original} passHref >
              <a target="_blank">
                <div className="img-thumb">
                </div>
                <style jsx>{`
                  .img-thumb{
                    background-repeat: no-repeat;
                    width: 100%;
                    height: 135px;
                    background-position: center center;
                    background-size: cover;
                    display:block;
                    background-image: url(${document.thumb});
                  }
                `}</style>
              </a>
            </Link>
          </Col>
        ))}
      </Row>
    </Scrollbars>
  )
}

export default ListingDocuments;
