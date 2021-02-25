import React from 'react';
import './Order.css';
import PostcodeChecker from '../PostcodeChecker';
import Menu from '../Menu';

function Order() {
  return (
    <div id='orderPage-container'>

      <p>Order</p>
      <PostcodeChecker />
      <Menu />

    </div>
  );
}

export default Order;
