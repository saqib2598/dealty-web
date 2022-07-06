import React from 'react';

class AddressSection extends React.Component {
  render() {
    const { listing } = this.props
    return (
      <div>
        <img alt="Value Icon" src='/static/images/icon-value.svg' />
        <h4 className="mt-2">{listing.address} {listing.address2 && `#${listing.address2}`}</h4>
      </div>
    )
  }
}

class NoEstimatedPrice extends React.Component {
  render() {
    return (
      <p>
        <strong>
          We’re sorry, we couldn’t find data to estimate the value of your property.<br/>You can still set the list price on submission.
        </strong>
      </p>
    );
  }
};

export { NoEstimatedPrice, AddressSection };
