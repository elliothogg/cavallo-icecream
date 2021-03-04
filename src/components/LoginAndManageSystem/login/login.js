import React, { Component } from 'react'
import './login.css'
import imgUrl from '../login/static/hjj.png'
export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            userName:'',//用户名
            passWord:'',//密码
            userNameValid:true,
            passWordValid:true
        }
    }


    textChange(key,event){
        console.log(key)
        this.setState({[key]:event.target.value})
        if("" === event.target.value){
            this.setState({[key+'Valid']:false})
        }else{
            this.setState({[key+'Valid']:true})
        }
    }


    doLogin(){//登录
        console.log(this.state)
    }

    handleSubmit(event){
        console.log(this.state.userName)
        event.preventDefault();
    }


    render() {
        return (
            <div className="App" >
                <section className="login-bg-wrap">
                    <img src={imgUrl} className="login-bg-image" alt=""/>
                    <div className="login-content">
                        <span className="logo"><img src={require('./static/logo_2.png')} alt=""/></span>
                        <br/>
                        <br/>
                        <h2>Welcome</h2>
                        <h1>Cavallo Icecream Online Shopping</h1>
                        <form action="" onSubmit={this.handleSubmit.bind(this)}>
                            <label>
                                <span>Account</span>
                                <input type="text" value={this.state.userName}  onChange={this.textChange.bind(this,'userName')}/>
                                <i className={this.state.userNameValid===false?"error":'required'}>Please input account</i>
                            </label>
                            <label>
                                <span>password</span>
                                <input type="password" value={this.state.passWord} onChange={this.textChange.bind(this,'passWord')}/>
                                <i className={this.state.passWordValid===false?"error":'required'}>Please input password</i>
                            </label>
                            <button type="submit" className={((""===this.state.userName) ||(""===this.state.passWord))?"login-btn disabled":"login-btn" } onClick={this.doLogin.bind(this)}>Login</button>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}
