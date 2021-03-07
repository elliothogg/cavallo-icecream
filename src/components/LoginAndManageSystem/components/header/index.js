import React, {Component} from 'react';
import { Modal} from 'antd';
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../Utils/dateUpdate'
import './index.less'
import LinkButton from "../link-button";


class Header extends Component {

    state= {
        currentTime:formateDate(Date.now())

    }

    /*
    退出登录
     */
    loginOut=()=>{
        //确认信息
        Modal.confirm({
            title: 'Do you Want to exit?',
            onOk:() =>{
                console.log("ok")
                //确定后删除存储的用户信息，并退出
                //local中的
                //内存中的
                //跳转到登录界面
                this.props.history.replace('/login')
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    }

    /*
    得到当前请求的pathtitle
     */
    getTitle=()=>{
        let title=''
        const path=this.props.location.pathname
        menuList.forEach(item => {
            if(item.key===path){
                title=item.title
            }
            else if (item.children) {
                const cItem=item.children.find(cItem => cItem.key===path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    componentDidMount() {
        //启动定时器
         this.intervalId=setInterval(()=>{
            //将currentTime更新
            this.setState({
                currentTime:formateDate(Date.now())
            })
        },1000)
    }

    componentWillMount() {
        //清楚定时器
        clearInterval(this.intervalId)
    }

    render() {
         const title=this.getTitle()
        const {currentTime} =this.state
        return (
            <div className="header">
                <div className="header-top">
                    欢迎，admin
                    <LinkButton onClick={this.loginOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"/>
                        <span>多云</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);