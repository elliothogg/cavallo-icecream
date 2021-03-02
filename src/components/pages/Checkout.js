import React from 'react';
import './Checkout.css';
import CustomerDetails from '../CustomerDetails';
import Payment from '../Payment';
import BasketSummary from '../BasketSummary';

class Checkout extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div id='Checkout-container'>
        
        <CustomerDetails {...this.props} />
        <Payment />
        <BasketSummary {...this.props} />

      </div>
    );
  }
}

export default Checkout;
