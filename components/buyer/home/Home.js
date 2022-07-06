/* eslint-disable require-jsdoc */
import React from 'react';
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardSubtitle,
} from 'reactstrap';
import moment from 'moment';
import {Router} from '../../../routes';
import DealtyTagBox from '../../images/dealty-tag-d-box';
import GoogleMapImage from '../../GoogleMapImage';
import CapitalizeText from '../../CapitalizeText';
import {Scrollbars} from 'react-custom-scrollbars';

function currentListingIndex(key, id) {
  localStorage.setItem('ListingIndex', key );
  Router.push(`/buy/home/${id}`);
}
const HomeCard = ({item, index, sizes, onMouseEnter, onMouseLeave, colClasses, cardClasses, isOtherHome, height}) => {
  return (
    <Col
      {...sizes}
      onMouseEnter={onMouseEnter ? () => onMouseEnter(item) : undefined}
      onMouseLeave={onMouseLeave ? () => onMouseLeave() : undefined}
      className={colClasses}
      onClick={() =>
        item.propertyType == "sold"
          ? ""
          : !isOtherHome
          ? index
            ? currentListingIndex(index, item.id)
            : Router.push(`/buy/home/${item.id}`)
          : ""
      }
    >
      <Card className={`home-card ${cardClasses}`}>
        {!isOtherHome && <DealtyTagBox />}
        {item.images && item.images.length > 0 ? (
          <div>
            <CardImg
              top
              width='100%'
              item='170px'
              src={item.images[0]}
              alt='home image'
            />
            {item.status === "pending" && (
              <div className='ribbon-wrapper'>
                <div className='ribbon'>
                  <CapitalizeText text={item.status} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='map-image' style={height ? height : { height: 170 }}>
            <GoogleMapImage lat={item.latitude} lng={item.longitude} />
            {item.status === "pending" && (
              <div className='ribbon-wrapper'>
                <div className='ribbon'>
                  <CapitalizeText text={item.status} />
                </div>
              </div>
            )}
          </div>
        )}
        <Scrollbars style={{ height: 120 }}>
          <CardBody>
            <div className='card__content'>
              <CardSubtitle>
                $
                {item.price
                  ? item.price.toLocaleString()
                  : item.soldPrice
                  ? item.soldPrice.toLocaleString() + " Sold Price"
                  : "0"}
              </CardSubtitle>
              <CardText>{`${item.bedrooms}bd   ${item.bathrooms}${
                item.halfBaths > 0 ? ".5" : ""
              }ba   ${item.sqft? item.sqft.toLocaleString() : '0'}sqft`}</CardText>
            </div>
            <CardText>
              {`${item.address} ${item.address2 ? item.address2 : ""}`}
              <br />
              {`${item.city ? item.city : ""}, ${
                item.state ? item.state : ""
              } ${item.zip ? item.zip : ""}`}
            </CardText>
            {item.openHouseDates && item.openHouseDates.length > 0 && (
              <>
                <CardSubtitle>
                  {" "}
                  <i>Open House Dates:</i>
                </CardSubtitle>
                {item.openHouseDates.map((open_date) => {
                  return (
                    <CardText>
                      {moment(open_date.openDate).format("MM/DD/YYYY")}{" "}
                      {moment(open_date.startTime).format("h:mm a")} -{" "}
                      {moment(open_date.endTime).format("h:mm a")}
                    </CardText>
                  );
                })}
              </>
            )}
          </CardBody>
        </Scrollbars>
      </Card>
      <style jsx>{`
        @import "styled-jsx-helper";
        :global(.card) {
          cursor: pointer;
        }
        :global(.non-dealty-home .card) {
          cursor: unset;
        }
        .card__content {
          margin-bottom: 10px;
        }
        :global(.card-body .card-text) {
          font-size: $font-size-sm;
        }
        :global(.card-text) {
          text-align: left;
        }

        :global(.card-subtitle) {
          color: $title-light-color;
        }

        :global(.card-img-top) {
          height: 170px;
          object-fit: cover;
        }

        :global(.non-dealty-home .card-img-top) {
          height: 100px;
        }

        .card__content :global(.card-text) {
          font-size: $font-size-base;
          font-weight: bold;
          text-align: left;
        }

        @include media-breakpoint-down(sm) {
          .card__content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
          }
        }
      `}</style>
    </Col>
  );
};

export default HomeCard;
