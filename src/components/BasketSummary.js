import React from 'react';
import './BasketSummary.css';
import BasketItem from './BasketItem';

class BasketSummary extends React.Component {
    constructor(props) {
        super(props)
      }


    render() {
      return (
        <div id="BasketSummary-container">
            <p>BasketSummary Component</p>
            <div class="OrderList" >
              {this.props.customerOrder.map((order => <BasketItem key ={order.id} {...this.props} id={order.id} flavor ={order.flavor} count={order.count} size={order.size} cost={order.cost}/>
              ))}
            </div>

        </div>
      );
    }

  }

  export default BasketSummary;
