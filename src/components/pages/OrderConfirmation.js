import React from 'react';
import './OrderConfirmation.css';
import CustomerDetails from '../CustomerDetails';
import Payment from '../Payment';

function OrderConfirmation() {
  return (
    <div id='OrderConfirmation-Container'>

      <CustomerDetails />
      <Payment />

    </div>
  );
}

export default OrderConfirmation;
