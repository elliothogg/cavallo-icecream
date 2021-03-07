import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from "../../components/left_nav";
import Header from "../../components/header";
import Home from '../home/home'
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const {Footer, Sider, Content} = Layout;

class Admin extends Component {
    render() {
        return (
            <Layout style={{height:'900px'}}>
                <Sider>
                    <LeftNav/>
                </Sider>

                <Layout>
                    <Header/>
                    <Content style={{background:'white',margin:'20px'}}>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/category" component={Category}/>
                        <Route path="/product" component={Product}/>
                        <Route path="/role" component={Role}/>
                        <Route path="/user" component={User}/>
                        <Route path="/charts/bar" component={Bar}/>
                        <Route path="/charts/line" component={Line}/>
                        <Route path="/charts/pie" component={Pie}/>
                        <Redirect to='/home'/>
                    </Switch>

                    </Content>
                    <Footer style={{textAlign:'center',color:'rgba(0,0,0,0.5)'}}>Cavallo Ice Cream Shop</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;