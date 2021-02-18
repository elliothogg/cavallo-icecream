import React, { Component } from 'react';
import './PortalLogin.css';

class PortalLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleUserNameChange(event) {
        this.setState({username: event.target.value});
      }

      handlePasswordChange(event) {
        this.setState({password: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        fetch(`/company-portal`,{
          method:'POST',
          headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body:`username=${this.state.username}&password=${this.state.password}`
        }).then((response)=>{
          return response.json()
        }).then((data)=>{
          console.log(data)
        }).catch(function(error) {
          console.log(error)
        })
        }

        render() {
            return (
              <div className="PortalLogin-container">
                  <form id="userInfo-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="Username">Username</label>
                    <input
                      id="username"
                      type="text"
                      value={this.state.username}
                      onChange={event =>this.handleUserNameChange(event)}
                    />
                    <label htmlFor="Password">Password</label>
                    <input
                      id="password"
                      type="text"
                      value={this.state.password}
                      onChange={event =>this.handlePasswordChange(event)}
                    />
                    <button type="submit">Submit</button>
                  </form>
              </div>
            );
        
          }
}

export default PortalLogin;