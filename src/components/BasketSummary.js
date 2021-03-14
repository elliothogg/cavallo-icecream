import React from 'react';
import './BasketSummary.css';
import {Link, useLocation} from "react-router-dom";

function BasketSummary(props) {

  const currentRoute = useLocation();

  const changeButtons = () => {
    if (currentRoute.pathname === '/')
      return <Link id='basketbuttons-orderpage' to="/checkout"><button id = "Checkout-button">Checkout</button></Link>
    else if (currentRoute.pathname === '/checkout')
      return <div id='basketbuttons-checkoutpage'><Link to="/"><button id = "Back-2-menu-button">Back to menu</button></Link><Link to="/order-confirmation"><button id = "place-order-button"onClick={props.confirmOrder}>Place Order</button></Link></div>
  }

  const deleteItem = (itemId) => {
    props.removeCustomerOrderItem(itemId);
  }

  const addOneToItemCount = (itemId) => {
    props.incrementItemCountUp(itemId)
  }

  const subtractOneFromItemCount = (itemId) => {
    props.incrementItemCountDown(itemId)
  }

  return (
    <div id="BasketSummary-container">


        <div id="order-items-container" className="container-fluid">
        <hr className="col-12" />
        <div className="col-12">
            <div className="row">
            <div className="col-3" id = "flav">FLAVOUR</div>
            <div className="col-3" id = "quan">QUANTITY</div>
            <div className="col-2" id = "size">SIZE</div>
            <div className="col-1" id = "price">PRICE</div>
            <div className="col-1"></div>
            </div>
        </div>

        {props.customerOrder.Items.map((order, index) => {
        return (
            <div key={index} className="col-12">
            <div className="row">
                <div className="col-3" id = "order-flav">{order.Flavour}</div>
                <div className="col-3" id = "order-quan">{order.Quantity}</div>
                <div className="col-2" id = "order-size">{order.Size}</div>
                <div className="col-2" id = "order-price">{order.TotalCost * order.Quantity}</div>
                <div className="col-1"><button id = "Cancel-in-basket" onClick={() => deleteItem(order.ItemID)}>x</button></div>

                <div className="col-1"><button id = "Minus-in-basket" onClick={() => subtractOneFromItemCount(order.ItemID)}>-</button></div>
                <div className="col-1"><button id = "Plus-in-basket" onClick={() => addOneToItemCount(order.ItemID)}>+</button></div>
            </div>
            </div>
        );
        })}
        </div>

        <hr className="col-10"/>
        <p id='total-price'>Total Price:  £{props.customerOrder.TotalCost}</p>
        {changeButtons()}

    </div>

  );
}

export default BasketSummary;
