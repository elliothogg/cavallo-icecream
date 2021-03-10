import React, { Component } from 'react';
import './PostcodeChecker.css';

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
  }

  handleChange(event) {
    this.setState({ destination: event.target.value });
  }

  displayResult() {
    if (this.state.distance === "err")
      this.setState( {resultMessage: 'Please enter a valid Postcode'});
    else if (this.state.distance < 5) {
      this.props.setIsDelivery(true);
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

  render() {
    return (
      <div className="PostcodeChecker-container">
          <form id="postcode-form">
            <label htmlFor="destination">Enter Your Postcode: </label>
            <input
              id="destination"
              type="text"
              value={this.state.destination}
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleDeliverySubmit}>Delivery</button>
            <button type="submit" onClick={this.handleCollectionSubmit}>Collection</button>
          <p> {this.state.resultMessage} </p>
          </form>
      </div>
    );

  }
}

export default PostcodeChecker;