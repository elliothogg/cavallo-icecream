import React, {useState} from 'react';
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
      products: [

      ],

      companyInfo: {

      },

      customerOrder: {
        orderID: '',
        OrderTime: '',
        DeliveryOrCollection: false,
        TotalCost: 0.0,
        Items: []

      },

      customerDetails: {
        name: "Gabriel"
      },

      setCustomerOrder: this.setCustomerOrder.bind(this),
      setCustomerDetails: this.setCustomerDetails.bind(this),
      removeCustomerOrderItem: this.removeCustomerOrderItem.bind(this)
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
      console.log("*************restaurant-information jsonData********************");
      console.log(jsonData);
      var dataArray = jsonData.data;
      this.setState({
        companyInfo : {
          ID : dataArray[0].ID,
          RestaurantName : dataArray[0].RestaurantName,
          Address: dataArray[0].Address,
          PostCode: dataArray[0].PostCode,
          Email: dataArray[0].Email,
          Telephone: dataArray[0].Telephone,
          WeekdayOpeningTime: dataArray[0].WeekdayOpeningTime,
          WeekdayClosingTime: dataArray[0].WeekdayClosingTime,
          WeekendOpeningTime: dataArray[0].WeekendOpeningTime,
          WeekendClosingTime: dataArray[0].WeekendClosingTime,
          Slogan: dataArray[0].Slogan
        }
      })
      console.log(this.state);
    });
    })
    .catch((error) => {
      console.error(error);
    });

    fetch('/api/productMenu')
    .then((res) => {
      return res.json().then((response) => {
      var resData = JSON.stringify(response);
      var jsonData = JSON.parse(resData);
      console.log("*************productMenu jsonData********************");
      console.log(jsonData);
      var dataArray = jsonData.data;
      console.log("*************state********************");
      this.setState({
        products : dataArray
      })
      console.log(this.state);
    });
    })
    .catch((error) => {
      console.error(error);
    });

    //Note:
    //Both companyInfo and Product data are Arrays when they are sent by the BE.
    //For companyInfo data, there is only one element in the array(dataArray[0]),
    //this element contails all the attributes(fields?) of the companyInfo,
    //and these attributes(fields?) data can also be accessed separately (see code from line 52-64).
    //For product data, there are 45 Arrays(dataArray[0]-dataArray[44]),
    //each of these element also contains all the attributes(fields?) of the product(PorductID, Description, Size, Totalcost)
    //to access these attributes(fields?) data of one element, use the same way from line 52-64.

  }

  //this fuction will be passed down to Menu.js where it will be called to update state about customers order stored here.
  setCustomerOrder(order) {
    //pass in an object with customers order (called in Menu.js)

    // var found = false;
    // for(var i=0; i < this.state.customerOrder.length; i++){
    //   if (this.state.customerOrder[i].id == order.id){
    //
    //       const index = this.state.customerOrder.findIndex(or => or.id === order.id),
    //       orders = [...this.state.customerOrder]
    //       // important to create a copy, otherwise you'll modify state outside of setState call
    //       orders[index] = order;
    //       this.setState({customerOrder: orders});
    //
    //   }
    // }

    var orderItems = this.state.customerOrder.Items
    const index = orderItems.findIndex(ord => ord.ProductID === order.ProductID)
    console.log(index);

    if (index !== -1){
      var customerOrd = this.state.customerOrder
      var items = customerOrd.Items
      items[index] = order;
      this.setState({customerOrder: customerOrd});
    } else {
      var customerOrd = this.state.customerOrder
      customerOrd.Items.push(order)
      this.setState({customerOrder: customerOrd});

      // let customerOrd = this.state.customerOrder
      // customerOrd.Items.concat(order)
      // this.setState({
      // customerOrder: [...this.state.customerOrder, order]
      // });
    }



    //
    // console.log(this.state.orders.length);
    // console.log([...this.state.customerOrder])
  }



  removeCustomerOrderItem(productID){
    var customerOrd = this.state.customerOrder
    var ords = customerOrd.Items
    const orders = ords.filter(item => item.ProductID !== productID);

    this.setState({customerOrder: customerOrd})
    // this.state.customerOrder.splice(index, index)


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
