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
      <div id="Checkout-container" className="row">
        
        <div className="col-6">
           <CustomerDetails {...this.props} />
           <Payment />
        </div>
        <div className="col-6">
           <BasketSummary {...this.props} />
        </div>
              
      </div>
    );
  }
}

export default Checkout;
