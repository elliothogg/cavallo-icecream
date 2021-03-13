import React from 'react';
import './BasketItem.css';


class BasketItem extends React.Component {
    constructor(props) {
        super(props)

      }


    deleteItem = () => {
      this.props.removeCustomerOrderItem(this.props.ItemID);
    }

    calculateFinalPrice(){
      let pricePerItem = parseFloat(this.props.cost);
      let count = this.props.count;

      return pricePerItem*count;
    }

    render() {
      return (
        <div id="BasketItem">
            <p>{this.props.flavor}</p>
            <p>{this.props.count}</p>
            <p>{this.props.size}</p>
            <p>£{this.calculateFinalPrice()}</p>



            <button onClick={this.deleteItem}>Remove Item</button>
        </div>
      );
    }

  }

  export default BasketItem;
