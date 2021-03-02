import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Order from './components/pages/Order';
import Checkout from './components/pages/Checkout';
import OrderConfirmation from './components/pages/OrderConfirmation';
import CompanyPortal from './components/pages/CompanyPortal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    //We will store customers order and details in the App.js state (below is just example)
    this.state = {
      products: {

      },

      companyInfo: {

      },

      customerOrder: {
        item1: {
          flavour: 'vanilla',
          size: 'L'
        }
      },

      customerDetails: {
        name: "Gabriel"
      },
      setCustomerOrder: this.setCustomerOrder,
      setCustomerDetails: this.setCustomerDetails
    }
  }

  componentDidMount() {
    //here we make all GET requests to get information about companyInfo and products

    //this function is called when page is loaded

    fetch('/api/restaurant-information')
    .then((res) => {
      return res.json().then((response) => {
      var resData = JSON.stringify(response);
      var jsonData = JSON.parse(resData);
      console.log("*************jsonData********************");
      console.log(jsonData);
      console.log("*************dataArray********************");
      var dataArray = jsonData.data;
      console.log(dataArray);
    });
    })
    .catch((error) => {
      console.error(error);
    }); 

    //**************To access restaurant info**************
    //this.state = {
    //  RestaurantInfo: {
    //    ID: '',
    //    RestaurantName: '',
    //    Address: '',
    //    PostCode: '',
    //    Email: '',
    //    Telephone: '',
    //    WeekdayOpeningTime: '',
    //    WeekdayClosingTime: '',
    //    WeekendOpeningTime: '',
    //    WeekendClosingTime: '',
    //    Slogan: ''
    //  }
    //}


    fetch('/api/productMenu')
    .then((res) => {
      return res.json().then((response) => {
      var resData = JSON.stringify(response);
      var jsonData = JSON.parse(resData);
      console.log("*************jsonData********************");
      console.log(jsonData);
      console.log("*************dataArray********************");
      var dataArray = jsonData.data;
      console.log(dataArray);
    });
    })
    .catch((error) => {
      console.error(error);
    }); 

    //**************To access product menu**************
    //this.state = {
    //  Product: {
    //    ProductID: '',
    //    Description: '',
    //    Size: '',
    //    TotalCost: '',
    //  }
    //}

  }

  //this fuction will be passed down to Menu.js where it will be called to update state about customers order stored here.
  setCustomerOrder(customerOrder) {
    //pass in an object with customers order (called in Menu.js)
    this.customerOrder = customerOrder;
  }

  //this will be called in CustomerDetails.js. This will allow the App.js state to hold the customer details, which can then be passed (as props) to OrderResult.
  setCustomerDetails(customerDetails) {
    //pass in an object with customers details (called in CustomerDetails.js)
    this.customerDetails = customerDetails;
  }

  //note: Header and Footer components need to be passed the companyInfo state from App.js so that they can display it.

  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>

            {/* Order, Checkout, and OrderConfirmation now receive all of App.js state (as props) */}
            <Route path='/' exact render={() => <Order {...this.state} />} />
            <Route path='/checkout' exact render={() => <Checkout {...this.state} />} />
            <Route path='/order-confirmation' exact render={() => <OrderConfirmation {...this.state} />} />
            <Route path='/company-portal' component={CompanyPortal} />
          </Switch>
        <Footer />
        </Router>
      </>
    );
  }
}

export default App;
