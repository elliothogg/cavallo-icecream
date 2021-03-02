import React from 'react';
import './BasketSummary.css';

class BasketSummary extends React.Component {
    constructor(props) {
        super(props)
      }
  
    render() {
      return (
        <div id="BasketSummary-container">
            <p>BasketSummary Component</p>

            {/* //We can access props from App.js like this... */}
            <p>{this.props.customerOrder.item1.flavour}</p>
            <p>{this.props.customerOrder.item1.size}</p>
        </div>
      );
    }
  
  }
  
  export default BasketSummary;