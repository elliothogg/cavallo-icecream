import React, {useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Order from './components/pages/Order';
import Checkout from './components/pages/Checkout';
import OrderConfirmation from './components/pages/OrderConfirmation';
import CompanyPortal from './components/pages/CompanyPortal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(){

// const [menuItems, setMenuItems] = useState([]);
const [orders, setOrders] = useState([]);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/' render={(props) => (<Order {...props} orders = {orders} setOrder = {setOrders} />)} />
          <Route path='/checkout' exact component={Checkout} />
          <Route path='/order-confirmation' component={OrderConfirmation} />
          <Route set path='/company-portal' component={CompanyPortal} />
        </Switch>
      <Footer />
      </Router>
    </>
  );
}

export default App;
