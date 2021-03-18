import React, { Component } from 'react';
import './PostcodeChecker.css';
import { Link } from 'react-router-dom';

class PostcodeChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      distance: '',
      resultMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDeliverySubmit = this.handleDeliverySubmit.bind(this);
    this.handleCollectionSubmit = this.handleCollectionSubmit.bind(this);
    this.shopClosed = this.shopClosed.bind(this);
  }

  
  handleChange(event) {
    this.setState({ destination: event.target.value });
  }

  displayResult() {
    if (this.state.distance === "err") {

      this.setState( {resultMessage: 'Please enter a valid Postcode'});

    }
    else if (this.state.distance < 5) {
      this.props.setIsDelivery(true);

      // update the deliverPostcode of customerDetails by the postcode that user input
      // So we can use it in checkout later.
      this.props.setCustomerDetails({
        ...this.props.customerDetails,
        deliveryPostcode: this.state.destination
      });
    }
    else {
      this.setState( {resultMessage: 'Sorry, your address is too far away :( Alternatively, you can select collection.'});
    }
  }

  handleDeliverySubmit(event) {
    event.preventDefault();
    fetch(`/api/check-postcode?destination=${encodeURIComponent(this.state.destination)}`)
    .then(response => response.json())
    .then(state => {
      this.setState( state );
      this.displayResult()
    })
  }

  handleCollectionSubmit(event) {
    event.preventDefault();
    this.props.setIsDelivery(false);
  }


  shopClosed() {
    let hour = this.props.currentTime.slice(11,13)
    if (hour >= 11 && hour < 18)
      return <form id="postcode-form">
              <label htmlFor="destination">Enter Your Postcode: </label>
              <input
                id="destination"
                type="text"
                value={this.state.destination}
                onChange={this.handleChange}
              />
              <div className ="twoButtons">
              <button type="submit" onClick={this.handleDeliverySubmit}>Delivery</button>
              <button type="submit" onClick={this.handleCollectionSubmit}>Collection</button>
              </div>
            <p> {this.state.resultMessage} </p>
            </form>
    else return <form id="postcode-form"><label>SHOP CLOSED :(</label><Link to="/menu"><button>SEE MENU</button></Link></form>
  }

  
  render() {
    this.shopClosed();
    return (
      <div className="PostcodeChecker-container">
          {this.shopClosed()}
          
      </div>
    );

  }
}

export default PostcodeChecker;