import React from 'react';
import './OrderConfirmation.css';
import OrderResult from '../OrderResult';

function orderConfirmation() {
  return (
    <div id='orderConfirmation-container'>
      <OrderResult />
    </div>
  );
}

export default orderConfirmation;