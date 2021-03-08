import React, { Component } from 'react';
import './Item.css';
import image from "./ItemImages/Mint.jpg"
class Item extends Component {

constructor(props){
  super(props);
  // this. = this.handleClick.bind(this);
}
  state = {
    id: this.props.id,
    flavor : this.props.flavor,
    count : 1,
    size: this.props.size,
    cost: this.props.cost,
    imageLoc: './ItemImages/'+this.props.flavor+'.jpg'

  };

  incrumentUp = () => {
    this.setState({count: this.state.count + 1})
  };

  incrumentDown = () => {
    //if count = 0 dont do anything, else subtract one

    if (this.state.count > 1) return this.setState({count: this.state.count - 1})
};

  orderHandler = (e) => {
    // console.log("dssdf")
    e.preventDefault();
    this.props.setCustomerOrder({ProductID: this.state.id, Flavour: this.state.flavor, Size:this.state.size, Quantity: this.state.count, Cost: this.state.cost});
  };



  // onChangeValue = (event) => {
  //   this.setState({size: event.target.value})
  // }
  // <div onChange={this.onChangeValue}>
  //   <input type="radio" value="Small" name="gender" /> Small
  //   <input type="radio" value="Medium" name="gender" /> Medium
  //   <input type="radio" value="Large" name="gender" /> Large
  // </div>

  render() {
    return (
      <div className="background">
        <img className="iceImages" src={this.state.imageLoc} width='100'/>
        <h3>{this.state.flavor}</h3>
        <h4>{this.state.size}</h4>
        <h4>£{}</h4>
        <h4>{this.state.count}</h4>
        <span><button onClick={this.incrumentDown}>-</button></span>
        <button onClick = {this.orderHandler} >Add to Basket</button>
        <button onClick={this.incrumentUp}>+</button>
      </div>
    );
  }
}

export default Item;
