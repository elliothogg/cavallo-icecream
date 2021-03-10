import React from 'react';
import './Order.css';
import PostcodeChecker from '../PostcodeChecker';
import Menu from '../Menu';
import BasketSummary from '../BasketSummary';

class Order extends React.Component {
  constructor(props) {
    super(props)
  }

  displayMenuAndBasketSummary() {
    if (this.props.customerOrder.isDelivery == undefined) return <PostcodeChecker {...this.props}/>;
    else return <div id='menu-basketSummary-container'> <Menu {...this.props} /> <BasketSummary {...this.props} /> </div>;
  }

  
  render() {

    return (
      <div id='orderPage-container'>
        {this.displayMenuAndBasketSummary()}
        
        
      </div>
    );
  }
}

export default Order;
