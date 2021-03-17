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

  this.state = {
    id: this.props.id,
    flavor : this.props.flavor,
    count : 1,
    size: "S",
    extraCost: this.props.extraCost,
    sizeCost: parseFloat(this.props.products[0].sizeinfo[0].Price),
    totalCost: parseFloat(this.props.products[0].sizeinfo[0].Price + this.props.extraCost),
    sizesCosts: this.props.products[0].sizeinfo
    };
}

  incrumentUp = () => {
    this.setState({count: this.state.count + 1})
  };

  incrumentDown = () => {
    //if count = 1 dont do anything, else subtract one

    if (this.state.count > 1) return this.setState({count: this.state.count - 1})
};

  orderHandler = (e) => {
      e.preventDefault();
      this.props.setCustomerOrder({ProductID: this.state.id, Flavour: this.state.flavor, Size:this.state.size, Quantity: this.state.count, TotalCost: this.state.totalCost, ItemID: this.state.id + this.state.size});
      this.setState({count: 1})
  };



  setSizeAndPrice = (event) => {
    let selectedSize = event.target.value
    //get price for the size entered by user
    const index = this.state.sizesCosts.findIndex(size => size.Size === selectedSize)
    //change the type from string to float
    let sizeCost = parseFloat(this.state.sizesCosts[index].Price);
    let extraCost = parseFloat(this.state.extraCost);
    let totalCost;

    //change the sizeCost in the state to the price for the chosen size
    //the second function is a callback that is ran after the sizeCost has been set
    this.setState({sizeCost: sizeCost}, () => {
      totalCost = this.state.sizeCost + extraCost;
      this.setState({size: selectedSize})
      this.setState({totalCost: totalCost})
      this.setState({count: 1})
    })
  }


  render() {
    return (
      <div className="item-container">

        <div id={this.state.flavor.replace(/\s/g, '-') + "-image"}/>
        <h3>{this.state.flavor}</h3>

        <form id="size-dropdown"onSubmit={this.orderHandler}>
          <select name="size-dropdown-items" onChange={this.setSizeAndPrice} id="size-dropdown">
            <option value="S" name="size">{this.state.sizesCosts[0].Size}  -  £ {parseFloat(this.state.sizesCosts[0].Price) + parseFloat(this.state.extraCost)}</option>
            <option value="M" name="size">{this.state.sizesCosts[1].Size}  -  £ {parseFloat(this.state.sizesCosts[1].Price) + parseFloat(this.state.extraCost)}</option>
            <option value="L" name="size">{this.state.sizesCosts[2].Size}  -  £ {parseFloat(this.state.sizesCosts[2].Price) + parseFloat(this.state.extraCost)}</option>
            <option value="XL" name="size">{this.state.sizesCosts[3].Size}  -  £ {parseFloat(this.state.sizesCosts[3].Price) + parseFloat(this.state.extraCost)}</option>
            <option value="XXL" name="size">{this.state.sizesCosts[4].Size}  -  £ {parseFloat(this.state.sizesCosts[4].Price) + parseFloat(this.state.extraCost)}</option>
          </select>
        </form>
        </div>
      
    );
  }
}

export default Item;
