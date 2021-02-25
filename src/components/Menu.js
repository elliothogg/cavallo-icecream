import React, { Component } from 'react';
import Item from './Item';
import vanillaPic from './ItemImages/vanilla.jpeg';
import chocoPic from './ItemImages/choco.jpeg';
import strawberryPic from './ItemImages/strawberry.jpeg';
import pistaccioPic from './ItemImages/pistaccio.jpeg';
import './Menu.css';




class Menu extends Component {
  state = {
    counters: [
      {id: 1, flavor: "Vanilla", count: 0, imageDir: vanillaPic},
      {id: 2, flavor: "Chocolate", count: 0, imageDir: chocoPic},
      {id: 3, flavor: "Strawberry", count: 0, imageDir: strawberryPic},
      {id: 4, flavor: "Pistaccio", count: 0, imageDir: pistaccioPic},
    ]
  };

  render() {
    return (
      <div className="productList">

        {this.state.counters.map(counter => <Item className="product" key={counter.id} flavor ={counter.flavor} count={counter.count} imageDir={counter.imageDir} selected={true}/>)}
      </div>
    );
  }

}

export default Menu;
