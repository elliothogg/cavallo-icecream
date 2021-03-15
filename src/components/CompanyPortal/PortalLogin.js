import React, { Component } from 'react';
import './PortalLogin.css';

class PortalLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            result: ''
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

      displayError() {
        this.setState({result: 'Incorrect Username or Password'})
      }

      handleSubmit(event) {
        event.preventDefault();
		var data = JSON.stringify({
			username:this.state.username,
			password:this.state.password
		});
		fetch("/api/company-portal", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				}),
			})
			.then((res) => {
				return res.json().then((response) => {
				var resData = JSON.stringify(response);
				var jsonData = JSON.parse(resData);
	
        if (jsonData.code === 0) {
          this.displayError();
        }
        else if (jsonData.code === 1) {
          this.props.login();
        }
				

				
				
			});
			})
			.catch((error) => {
				console.error(error);
			});    
        }

        render() {
            return (
              
              <div className="PortalLogin-container">
              <p>U: cavallo || P:cavallo7</p>
                  <form id="userInfo-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="Username">Username:</label>
                    <input
                      id="username"
                      type="text"
                      value={this.state.username}
                      onChange={event =>this.handleUserNameChange(event)}
                    />
                    <label htmlFor="Password">Password: </label>
                    <input
                      id="password"
                      type="text"
                      value={this.state.password}
                      onChange={event =>this.handlePasswordChange(event)}
                    />
                    <button type="submit">Submit</button>
                  </form>
                  <label id="login-error-message">{this.state.result}</label>
              </div>
            );
        
          }
}

export default PortalLogin;