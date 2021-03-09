import React from 'react';
import './BasketSummary.css';
import BasketItem from './BasketItem';

class BasketSummary extends React.Component {
    constructor(props) {
        super(props)
      }

      state = {
        orders: this.props.customerOrder.Items
      }

    render() {
      return (
        <div id="BasketSummary-container">
            <p>BasketSummary Component</p>
            <div className="OrderList" >
            {this.props.customerOrder.Items.map((order => <BasketItem key ={order.ProductID} {...this.props} id={order.ProductID} flavor ={order.Flavour} count={order.Quantity} size={order.Size} cost={order.TotalCost}/>
            ))}
            </div>
            <button>Checkout</button>
        </div>
      );
    }

  }

  export default BasketSummary;
