import React from 'react';
import './Order.css';
import PostcodeChecker from '../PostcodeChecker';
import Menu from '../Menu';
import BasketSummary from '../BasketSummary';

class Order extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='orderPage-container'>

        <p>Order</p>
        <PostcodeChecker />

        {/* all props from App.js are passed onto Menu component */}
        <Menu {...this.props} />

        {/* all props from App.js are passed onto Menu component */}
        <BasketSummary {...this.props} />
      </div>
    );
  }
}

export default Order;
