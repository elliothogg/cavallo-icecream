import React, { Component } from 'react';

class PostcodeChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      distance: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ destination: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/check-postcode?destination=${encodeURIComponent(this.state.destination)}`)
      .then(response => response.json())
      .then(state => {
        this.setState( state ); 
        console.log(this.state) 
      })
    }

  render() {
    return (
      <div className="PostcodeChecker-container">
          <form id="postcode-form" onSubmit={this.handleSubmit}>
            <label htmlFor="destination">Enter Your Postcode: </label>
            <input
              id="destination"
              type="text"
              value={this.state.destination}
              onChange={this.handleChange}
            />
            <button type="submit">Order</button>
          </form>
          <p> {this.state.distance} </p>
      </div>
    );

  }
}

export default PostcodeChecker;