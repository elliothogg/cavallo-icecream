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
		var data = JSON.stringify({
			username:this.state.username,
			password:this.state.password
		});
		console.log(data);
		fetch("/company-portal", {
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
				console.log("*************resData********************");
				console.log(resData);
				var jsonData = JSON.parse(resData);
				console.log("*************jsonData********************");
				console.log(jsonData);
				console.log("*************dataArray********************");
				var dataArray = jsonData.data;
				console.log(dataArray);
				console.log("*************dataObject********************");
				dataArray = JSON.parse(dataArray);

				
				
			});
			})
			.catch((error) => {
				console.error(error);
			});    
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