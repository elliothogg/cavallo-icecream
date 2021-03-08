 import React, { Component } from 'react';
import Item from './Item';
// import vanillaPic from './ItemImages/vanilla.jpeg';
// import chocoPic from './ItemImages/choco.jpeg';
// import strawberryPic from './ItemImages/strawberry.jpeg';
// import pistaccioPic from './ItemImages/pistaccio.jpeg';
import './Menu.css';


class Menu extends React.Component {
  constructor(props) {
    super(props)

  };



  render() {
    return (
      <div className="productList">

        {this.props.products.map(product => <Item {...this.props} className="product" key={product.ProductID} id={product.ProductID} flavor ={product.Flavour} imageDir={product.imageDir} cost={product.ExtraCost} size={product.Size} selected={true}/>)}
      </div>
    );
  }

}

export default Menu;
