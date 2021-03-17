import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Order from './components/pages/Order';
import Checkout from './components/pages/Checkout';
import OrderConfirmation from './components/pages/OrderConfirmation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompanyPortal from './components/CompanyPortal/CompanyPortal';
import MenuNoOrder from './components/MenuNoOrder';

class App extends React.Component {
  constructor(props) {
    super(props);

    //We will store customers order and details in the App.js state (below is just example)
    this.state = {
      products: [
      ],

      currentTime: '',

      companyInfo: {
      },

      customerOrder: {
        orderID: '',
        OrderTime: '',
        isDelivery: undefined,
        TotalCost: 0,
        Items: []
      },

      // Do not remove it. It will be used to validate form
      paymentDetails: {
        paymentMethod: 'credit',
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: ''
      },

      customerDetails: {
        customerFirstName: '',
        customerLastName: '',
        customerPhone: '',
        customerEmail: '',
        billingAddress: '',
        billingPostcode: '',

        deliveryAddress: '',
        deliveryPostcode: '',
        deliveryTime: 'ASAP',
        collectionTime: 'ASAP',
        driverInstructions: ''
      },

      setCustomerOrder: this.setCustomerOrder.bind(this),
      setPaymentDetails: this.setPaymentDetails.bind(this),
      setCustomerDetails: this.setCustomerDetails.bind(this),
      removeCustomerOrderItem: this.removeCustomerOrderItem.bind(this),
      setIsDelivery: this.setIsDelivery.bind(this),
      confirmOrder: this.confirmOrder.bind(this),
      incrementItemCountUp: this.incrementItemCountUp.bind(this),
      incrementItemCountDown: this.incrementItemCountDown.bind(this)

    }
  }

  componentDidMount() {
    //here we make all GET requests to get information about current time, companyInfo and products

    //this function is called when page is loaded

    fetch('/api/currentTime')
    .then((res)=>{
      return res.json().then((response=>{
        var resData = JSON.stringify(response);
        var jsonData = JSON.parse(resData);
        console.log("Current Time: " + jsonData.curTime);
        this.setState({
          currentTime: jsonData.curTime
        })
      }))
    }).catch((error) => {
      console.error(error);
    });

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
    }).catch((error) => {
      console.error(error);
    });

    fetch('/api/productMenu')
    .then((res) => {
      return res.json().then((response) => {
      var resData = JSON.stringify(response);
      var jsonData = JSON.parse(resData);
      console.log("*************productMenu jsonData********************");
      console.log(jsonData);
      var productArray = jsonData.productJSON;
      var sizeArray = jsonData.sizeJSON;
      console.log("*************state********************");
      this.setState({
        products : [{
          productinfo : productArray,
          sizeinfo : sizeArray
        }]
      })
      console.log(this.state)
    });
    }).catch((error) => {
      console.error(error);
    });

    //Note:
    //Both companyInfo and Product data are Arrays when they are sent by the BE.
    //For companyInfo data, there is only one element in the array(dataArray[0]),
    //this element contails all the attributes(fields?) of the companyInfo,
    //and these attributes(fields?) data can also be accessed separately (see code from line 52-64).
    //For product data, there are 2 JSONs when the data where send from the BE,
    //the 2 JSONs are contains in one Array(products[0]),
    //to get productinfo Array or sizeinfo Array use products[0].productinfo, or products[0].sizeinfo,
    //and to get all the attributes(fields?) of productinfo or sizeinfo,
    //use the same way from line 52-64.

  }

  //this fuction will be passed down to Menu.js where it will be called to update state about customers order stored here.
  setCustomerOrder(order) {
    //pass in an object with customers order (called in Menu.js)

    var orderItems = this.state.customerOrder.Items
    const index = orderItems.findIndex(ord => ord.ItemID === order.ItemID)

    if (index !== -1){
      var customerOrd = this.state.customerOrder
      var itemCount = customerOrd.Items[index].Quantity
      var extraCount = order.Quantity
      var newCount = itemCount + extraCount
      // items[index] = order;
      customerOrd.Items[index].Quantity = newCount

      this.setState({customerOrder: customerOrd}, () => this.setOrderPrice());
    } else {
      customerOrd = this.state.customerOrder
      customerOrd.Items.push(order)
      this.setState({customerOrder: customerOrd}, () => this.setOrderPrice());

    }
  }

  setOrderPrice() {
    let orders = [...this.state.customerOrder.Items];
    let totalPrice = 0;
    for(let i=0; i<orders.length; i++) {
      totalPrice += orders[i].TotalCost * orders[i].Quantity
    }
    this.setState(state => ({
      customerOrder: { ...state.customerOrder, TotalCost: totalPrice}
    }))
  }

  //called in postcode checker
  setIsDelivery(booleanValue) {
    this.setState(state => ({
      customerOrder: { ...state.customerOrder, isDelivery: booleanValue }
    }));
  }

  incrementItemCountUp(itemId){
    var orderItems = this.state.customerOrder.Items
    const index = orderItems.findIndex(item => item.ItemID === itemId)
    var customerOrd = this.state.customerOrder
    var items = customerOrd.Items
    items[index].Quantity += 1
    customerOrd.Items = items
    this.setState({customerOrder: customerOrd}, () => this.setOrderPrice());
  }

  incrementItemCountDown(itemId){
    var orderItems = this.state.customerOrder.Items
    const index = orderItems.findIndex(item => item.ItemID === itemId)
    var customerOrd = this.state.customerOrder
    var items = customerOrd.Items
    if (items[index].Quantity > 1) {
      items[index].Quantity -= 1
      customerOrd.Items = items
      this.setState({customerOrder: customerOrd}, () => this.setOrderPrice());
    }
  }


  removeCustomerOrderItem(itemId){
    var customerOrd = this.state.customerOrder
    let ords = customerOrd.Items
    const orders = ords.filter(item => item.ItemID !== itemId);
    ords = orders
    customerOrd.Items = ords
    this.setState({customerOrder: customerOrd}, () => this.setOrderPrice());
  }

  //this will be called in CustomerDetails.js. This will allow the App.js state to hold the customer details, which can then be passed (as props) to OrderResult.
  setCustomerDetails(customerDetails) {
    //pass in an object with customers details (called in CustomerDetails.js)
    this.setState({ customerDetails });


  }

  setPaymentDetails(paymentDetails) {
    //pass in an object with customers details (called in Payment.js)
    this.setState({ paymentDetails });
  }

  confirmOrder() {
    let postBody = []
    postBody[0] = {
      storeID: this.state.companyInfo.ID,
      customerOrder: this.state.customerOrder,
      customerDetails: this.state.customerDetails
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody)
    };

    fetch('/api/orderConfirm', requestOptions)
      .then(response => response.json())
      //.then(data => this.setState({ postId: data.id }));
      .then(data => console.log(data))

    console.log(postBody);
  }

  //note: Header and Footer components need to be passed the companyInfo state from App.js so that they can display it.

  render() {
    console.log(this.state.companyInfo.RestaurantName)
    return (
      <>
        <Router>
          <Header restaurantName={this.state.companyInfo.RestaurantName} restaurantSlogan={this.state.companyInfo.Slogan}/>
          <Switch>

            {/* Order, Checkout, and OrderConfirmation now receive all of App.js state (as props) */}
            <Route path='/' exact render={() => <Order {...this.state} />} />
            <Route path='/checkout' exact render={() => <Checkout {...this.state} />} />
            <Route path='/order-confirmation' exact render={(route) => <OrderConfirmation {...this.state} location={route.location} />} />
            <Route path='/company-portal' exact render={() => <CompanyPortal currentTime={this.state.currentTime} products={this.state.products} />} />
            <Route path='/menu' exact render={ () => <MenuNoOrder {...this.state} />} />
          </Switch>
        <Footer {...this.state} />
        </Router>
      </>
    );
  }
}

export default App;
