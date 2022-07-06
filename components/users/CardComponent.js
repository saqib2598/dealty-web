import React from 'react';
import { Alert } from 'reactstrap'
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';

const CardElement =  ({handleSubmit, subscribeSubmitter, error, updatingCard, user}) => {
  
  return (
    <div className="checkout">
      {error && <Alert color="danger">{error}</Alert>}
      {updatingCard ?
        <div className="card-info">
          <span className="card-label">Card No:</span>
          <span> **********{user.card}</span>
        </div>
        :
        <p>Would you like to complete the purchase?</p>
      }
      <hr />
      <label>Card</label>
      <CardNumberElement />
      <label>Expiry Date</label>
      <CardExpiryElement />
      <label>CVC</label>
      <CardCVCElement />
      <button disabled={subscribeSubmitter} onClick={handleSubmit} className="btn btn-secondary btn-lg btn-block">
        {updatingCard ? 'Save' : 'Purchase'}
      </button>
    </div>
  );
}

export default CardElement
