import React from 'react';
import Item from './Item';
import './Menu.css';


class Menu extends React.Component {


  render() {
    return (
      <div className="menu-container">

        {this.props.products[0].productinfo.map(product => <Item {...this.props} className="product" key={product.ProductID} id={product.ProductID} flavor ={product.Flavour} imageDir={product.imageDir} extraCost={product.ExtraCost} size={product.Size} selected={true}/>)}
      </div>
    );
  }

}

export default Menu;
