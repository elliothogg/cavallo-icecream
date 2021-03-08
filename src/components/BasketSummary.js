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
            <div class="OrderList" >
            {this.state.orders.map((order => <BasketItem key ={order.ProductID} {...this.props} id={order.ProductID} flavor ={order.Flavour} count={order.Quantity} size={order.Size} cost={order.Cost}/>
            ))}
            </div>

        </div>
      );
    }

  }

  export default BasketSummary;
