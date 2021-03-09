import React, {useState} from 'react';
import './BasketSummary.css';
import BasketItem from './BasketItem';
import {Link, useLocation} from "react-router-dom";

function BasketSummary(props) {
  const [orders, setOrders] = useState(props.customerOrder.Items);


  const currentRoute = useLocation();

  const changeButtons = () => {
    if (currentRoute.pathname === '/')
      return <Link id='basketbuttons-orderpage' to="/checkout"><button>Checkout</button></Link>
    else if (currentRoute.pathname == '/checkout')
      return <div id='basketbuttons-checkoutpage'><Link to="/"><button>Continue Shopping</button></Link><Link to="/order-confirmation"><button>Place Order</button></Link></div>
  }

  return (
    <div id="BasketSummary-container">
        <p>BasketSummary Component</p>
        <div className="OrderList" >
        {props.customerOrder.Items.map((order => <BasketItem key ={order.ProductID} {...props} id={order.ProductID} flavor ={order.Flavour} count={order.Quantity} size={order.Size} cost={order.TotalCost}/>
        ))}
        </div>
        <p id='total-price'>Total Price: £{props.customerOrder.TotalCost}</p>
        {changeButtons()}
    </div>
  );
}

export default BasketSummary;
