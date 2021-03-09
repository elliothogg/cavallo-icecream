import React, { Component } from 'react';
import './Item.css';


// import F01 from './ItemImages/FO1.jpg';
// import F02 from './ItemImages/FO2.jpg';
// import F03 from './ItemImages/FO3.jpg';
// import F04 from './ItemImages/FO4.jpg';
// import F05 from './ItemImages/FO5.jpg';
// import F06 from './ItemImages/FO6.jpg';
// import F07 from './ItemImages/FO7.jpg';
// import F08 from './ItemImages/FO8.jpg';
// import F09 from './ItemImages/FO9.jpsg';

class Item extends Component {

constructor(props){
  super(props);
  // this. = this.handleClick.bind(this);
}
  state = {
    id: this.props.id,
    flavor : this.props.flavor,
    count : 1,
    size: "",
    extraCost: this.props.extraCost,
    sizeCost: 0.0,
    totalCost: 0.0,
    imageDir: "",
    sizesCosts: this.props.products[0].sizeinfo
  };

  incrumentUp = () => {
    this.setState({count: this.state.count + 1})
  };

  incrumentDown = () => {
    //if count = 1 dont do anything, else subtract one

    if (this.state.count > 1) return this.setState({count: this.state.count - 1})
};

  orderHandler = (e) => {
    if (this.state.size === ""){
      alert("Please select a size")
      return
    } else {

      e.preventDefault();
      this.props.setCustomerOrder({ProductID: this.state.id, Flavour: this.state.flavor, Size:this.state.size, Quantity: this.state.count, TotalCost: this.state.totalCost});
    }

  };



  setSizeAndPrice = (event) => {
    let selectedSize = event.target.value

    //get price for the size entered by user
    const index = this.state.sizesCosts.findIndex(size => size.Size === selectedSize)
    //change the type from string to float
    let sizeCost = parseFloat(this.state.sizesCosts[index].Price);
    //change the sizeCost in the state to the price for the chosen size
    this.setState({sizeCost: sizeCost})
    
    let extraCost = parseFloat(this.state.extraCost);

    let totalCost = this.state.sizeCost + extraCost

    this.setState({size: event.target.value})
    this.setState({totalCost: totalCost})
  }


  render() {
    return (
      <div className="background">
        <img className="iceImages" src={this.state.imageDir} width='100'/>
        <h3>{this.state.flavor}</h3>
        <div onClick={this.setSizeAndPrice}>
          <input type="button" value="S" name="size" />
          <input type="button" value="M" name="size" />
          <input type="button" value="L" name="size" />
          <input type="button" value="XL" name="size" />
          <input type="button" value="XXL" name="size" />

        </div>
        <h4>{this.state.size}</h4>
        <h4>£{this.state.totalCost}</h4>
        <h4>{this.state.count}</h4>
        <span><button onClick={this.incrumentDown}>-</button></span>
        <button onClick = {this.orderHandler} >Add to Basket</button>
        <button onClick={this.incrumentUp}>+</button>
      </div>
    );
  }
}

export default Item;
