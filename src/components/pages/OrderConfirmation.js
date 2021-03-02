import React from 'react';
import './OrderConfirmation.css';
import OrderResult from '../OrderResult';

class orderConfirmation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='orderConfirmation-container'>

        {/* Here we pass all props from App.js to OrderResult.js so it can display information about order and customer. */}
        <OrderResult {...this.props}/>
      </div>
    );
  }
}

export default orderConfirmation;