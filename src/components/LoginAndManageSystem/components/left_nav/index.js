import React, {Component} from 'react';
import './index.less'
import {Link,withRouter}  from 'react-router-dom'
import { Menu} from 'antd';
import menuList from "../../config/menuConfig";
import logo from '../../login/static/logo_2.png'
import Icon from "@ant-design/icons";

/*
        左侧导航组件
 */
const { SubMenu } = Menu;
class LeftNav extends Component {

    /*
        根据指定的menu数据数组，生成对应的标签对象
        <Menu.Item/>,<subMenu/>
        map+递归
     */
    getMenuNodes = (menuList)=>{
        return menuList.map(item=> {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                )
            }
            return (
                <SubMenu
                    key={item.key}
                    title={
                    <span>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </span>
                }
                >
                    {
                        this.getMenuNodes(item.children)

                    }
                </SubMenu>
            )
        })
    }
    render() {

        //得到当前请求的路由路径
        const selectKey=this.props.location.pathname

        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo"/>
                    <h1>后台系统</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={[selectKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.getMenuNodes(menuList)
                    }


                </Menu>

            </div>
        );
    }
}
export default withRouter(LeftNav);