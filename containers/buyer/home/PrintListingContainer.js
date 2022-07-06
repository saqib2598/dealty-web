import React from 'react';
import ReactToPrint from 'react-to-print';
import PrintFlyerHeader  from '../../../components/buyer/home/PrintFlyerHeader'
import PrintFlyerImage from '../../../components/buyer/home/PrintFlyerImage'
import PrintFlyerInfo from '../../../components/buyer/home/PrintFlyerInfo'
import PrintFlyerOwnerInfo from '../../../components/buyer/home/PrintFlyerOwnerInfo'
import { Button } from 'reactstrap'

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { home } = this.props

    return (
      <div className="listing-print-flyer">
        <PrintFlyerHeader
          address = {home.address}
          city = {home.city}
          price = {home.price}
          state = {home.state}
          zip = {home.zip}
          price = {home.price}
          id = {home.id}
        />
        { home.images.length > 0 &&
          <PrintFlyerImage
            images = { home.images }
            id = {home.id}
          />
        }
        <PrintFlyerInfo
          beds = {home.bedrooms}
          baths = {home.bathrooms}
          sqft = {home.sqft}
          yearBuilt = {home.yearBuilt}
          garage = {home.parkingSpaces}
          pool = {home.pool}
          lotSize = {home.lotSize}
          HorseProperty = {home.horsePrivileges}
          desc = {home.description}
          id = {home.id}
        />
        {home.owner.seller.sellerType &&
          <PrintFlyerOwnerInfo
            owner = {home.owner}
            sellerType = {home.owner.seller.sellerType}
            id = {home.id}
          />
        }
      </div>
    );
  }
}

class PrintComponent extends React.Component {
  render() {
    const { home } = this.props

    return (
      <div className="listing-print-flyer">
        <ReactToPrint
          trigger={() => <Button className="px-3  print-button" style={{backgroundColor:'#1999A9'}}>Print Listing Flyer!</Button>}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <ComponentToPrint
            ref={el => (this.componentRef = el)}
            home={home}
          />
        </div>
      </div>
    );
  }
}
export default PrintComponent
