import React, { Component } from 'react';
import './Item.css';

class Item extends Component {

constructor(props){
  super(props);
  // this. = this.handleClick.bind(this);
}
  state = {
    flavor : this.props.flavor,
    imageDir : this.props.imageDir,
    count : this.props.count,
    orders: this.props.order,

  };

  incrumentUp = () => {
    this.setState({count: this.state.count + 1})
  };

  incrumentDown = () => {
    //if count = 0 dont do anything, else subtract one

    if (this.state.count > 0) return this.setState({count: this.state.count - 1})
};

  orderHandler = (e) => {
    e.preventDefault();
    this.props.setOrders([
      ...this.props.orders, {flavor: this.state.flavor, count: this.state.count}
    ]);
  };

  render() {
    return (
      <div className="background">
        <img className="iceImages" src={this.props.imageDir} width='100'/>
        <h1>{this.state.count}</h1>
        <h2>{this.props.flavor}</h2>
        <span><button onClick={this.incrumentDown}>-</button></span>
        <button onClick = {this.orderHandler} >Add to Basket</button>
        <button onClick={this.incrumentUp}>+</button>
      </div>
    );
  }
}

export default Item;
