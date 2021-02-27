import React from 'react';
import './Checkout.css';
import CustomerDetails from '../CustomerDetails';
import Payment from '../Payment';

function Checkout() {
  return (
    <div id='OrderConfirmation-Container'>

      <CustomerDetails />
      <Payment />

    </div>
  );
}

export default Checkout;
