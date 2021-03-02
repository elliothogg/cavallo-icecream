import React, { Component } from 'react';
import Item from './Item';
import vanillaPic from './ItemImages/vanilla.jpeg';
import chocoPic from './ItemImages/choco.jpeg';
import strawberryPic from './ItemImages/strawberry.jpeg';
import pistaccioPic from './ItemImages/pistaccio.jpeg';
import './Menu.css';




class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counters: [
        {id: 1, flavor: "Vanilla", count: 0, imageDir: vanillaPic},
        {id: 2, flavor: "Chocolate", count: 0, imageDir: chocoPic},
        {id: 3, flavor: "Strawberry", count: 0, imageDir: strawberryPic},
        {id: 4, flavor: "Pistaccio", count: 0, imageDir: pistaccioPic},
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  };

  //Here you can call the function from App.js and pass in your customers order, updating the state in App.js
  handleChange(event) {
    //this is the function from App.js
    this.props.setCustomerDetails();
  }


  render() {
    return (
      <div className="productList">

        {this.state.counters.map(counter => <Item className="product" key={counter.id} flavor ={counter.flavor} count={counter.count} imageDir={counter.imageDir} selected={true}/>)}

        {/* Now state from App.js can be accessed in this way... Once we have written GET requests in App.js you can use real data from database */}
        {/* <p>{this.props.products}</p> */}


      </div>
    );
  }

}

export default Menu;
