import React from 'react';
import './BasketSummary.css';
import BasketItem from './BasketItem';
import {Link} from "react-router-dom";

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
            <p id='total-price'>Total Price: £{this.props.customerOrder.TotalCost}</p>
            <Link to="/checkout"><button>
              Checkout
            </button>
            </Link>
        </div>
      );
    }

  }

  export default BasketSummary;
