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
      return <div id='basketbuttons-checkoutpage'><Link to="/"><button>Continue Shopping</button></Link><Link to="/order-confirmation"><button onClick={props.confirmOrder}>Place Order</button></Link></div>
  }

  const deleteItem = (item) => {
    props.removeCustomerOrderItem(item);
  }

  console.log(props.customerOrder)
  return (
    <div id="BasketSummary-container">
        

        <div id="order-items-container" className="container-fluid">
        <hr className="col-12" style={{ marginLeft: '0.5rem' }} />
        <div className="col-12" style={{ color: '#dddddd' }}>
            <div className="row">
            <div className="col-3">FLAVOUR</div>
            <div className="col-3">QUANTITY</div>
            <div className="col-2">SIZE</div>
            <div className="col-1">PRICE</div>
            <div className="col-1"></div>
            </div>
        </div>

        {props.customerOrder.Items.map((order, index) => {
        return (
            <div key={index} className="col-12">
            <div className="row" style={{ color: '#333333' }}>
                <div className="col-3">{order.Flavour}</div>
                <div className="col-3">{order.Quantity}</div>
                <div className="col-2">{order.Size}</div>
                <div className="col-2">{order.TotalCost}</div>
                <div className="col-1"><button onClick={() => deleteItem(order.ProductID)}>X</button></div>
            </div>
            </div>
        );
        })}
        </div>

        <hr className="col-10" style={{ marginLeft: '0.5rem' }} />
        <p id='total-price'>Total Price: £{props.customerOrder.TotalCost}</p>
        {changeButtons()}

    </div>

  );
}

export default BasketSummary;
