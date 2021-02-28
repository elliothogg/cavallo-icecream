import React, { Component } from 'react';
import './Item.css';
class Item extends Component {

  state = {
    flavor : this.props.flavor,
    imageDir : this.props.imageDir,
    count : this.props.count

  };

  incrumentUp = () => {
    this.setState({count: this.state.count + 1})
  }

  incrumentDown = () => {
    //if count = 0 dont do anything, else subtract one

    if (this.state.count > 0) return this.setState({count: this.state.count - 1});
    console.log('sdfsf')

}

addToBasket = () => {
  console.log('add to basket');

  // return {[{flavor: {flavor}, count: {count}}]};
}

  render() {
    return (
      <div className="background">
        <img className="iceImages" src={this.state.imageDir} width='100'/>
        <h1>{this.state.count}</h1>
        <h2>{this.state.flavor}</h2>
        <span><button onClick={this.incrumentDown}>-</button></span>
        <button onClick={this.addToBasket}>Add to Basket</button>
        <button onClick={this.incrumentUp}>+</button>
      </div>
    );
  }


}

export default Item;
