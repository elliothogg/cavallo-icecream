import React from 'react';
import './Order.css';
import PostcodeChecker from '../PostcodeChecker';

function Order() {
  return (
    <div id='orderPage-container'>
      <p>Order</p>
      <PostcodeChecker />

    </div>
  );
}

export default Order;
