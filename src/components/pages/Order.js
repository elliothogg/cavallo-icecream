import React from 'react';
import './Order.css';
import PostcodeChecker from '../PostcodeChecker';
import Menu from '../Menu';

function order( {orders,  setOrders} ) {


  return (
    <div id='orderPage-container'>

      <p>Order</p>
      <PostcodeChecker />
      <Menu orders = {orders} setOrders = {setOrders} />

    </div>
  );
}

export default order;
