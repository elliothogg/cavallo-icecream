import React from 'react';
import ItemNoOrder from './ItemNoOrder';
import './Menu.css';


class Menu extends React.Component {


  render() {
    return (
      <div id="no-order-container">
      <div className="menu-container menuNoOrder">
      
        {this.props.products[0].productinfo.map(product => <ItemNoOrder {...this.props} className="product" key={product.ProductID} id={product.ProductID} flavor ={product.Flavour} imageDir={product.imageDir} extraCost={product.ExtraCost} size={product.Size} selected={true}/>)}
      </div>
      </div>
    );
  }

}

export default Menu;
