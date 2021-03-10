var express = require('express');
const bodyParser = require('body-parser');
var sd = require('silly-datetime');
var router = express.Router();
const payThroughHorsePay = require('./payThroughHorsePay');
const updateOrders = require('./updateOrders');
const urlendodedParser= bodyParser.urlencoded({ extended: true });

router.post('/api/orderConfirm', urlendodedParser, (req, res) => {
    console.log(req.body);
    var inParam = req.body[0];
    var ItemsJSON = JSON.parse(JSON.stringify(inParam.customerOrder.Items));
    console.log(ItemsJSON);
  /* *********req.body
  [{
      storeID:'',
      customerOrder: 
        {
          orderID: '',
          OrderTime: '',
          isDelivery: undefined(true/false),
          TotalCost: 0,
          Items: []
        },

      customerDetails: 
        {
          customerFirstName: '',
          customerLastName: '',
          customerPhone: '',
          customerEmail: '',
          billingAddress: '',
          billingPostcode: '',
  
          deliveryAddress: '',
          deliveryPostcode: '',
          deliveryTime: '',
          driverInstructions: ''
      },
  }]
  ********** */
    
    return orderConfirm(inParam, ItemsJSON, (err, data) =>{
        if (err) return res.send(400);
        res.setHeader('Content-Type', 'application/json');
		    console.log("post success");
        console.log(data.res);
		    res.send(data.res);
      });
    });
module.exports = router;

function orderConfirm(inParam, ItemsJSON, callback){
  var orderID = generateOrderID(); 
  var storeID = inParam.storeID;
  var totalCost = inParam.customerOrder.TotalCost;
  var customerEmail = inParam.customerDetails.customerEmail;
  var customerPhone = inParam.customerDetails.customerPhone;
  var customerID = generateCustomerID(customerEmail, customerPhone);
  payThroughHorsePay(storeID, totalCost, customerID, function(err, data){
        if(err){
          console.log(err);
          return callback(err)
        }else{
          console.log("**********payThroughHorsePay****data*********");
          console.log(data);
          var payResult = data.paymetSuccess;
          if(payResult.Status === true){
            console.log("**********call updateOrders*************");
            updateOrders(inParam, ItemsJSON, orderID, customerEmail, customerPhone, totalCost, function(err, data){
              if(err){
                return callback(err)
              }else{
                console.log("ALL Success");
                return callback(null, {
                  res:{
                    resData: data
                  }
                });
              }
            })
          }else{
            console.log("**********call callback*************");
            return callback(null, {
              res:{
                orderID: orderID,
                Status : payResult.Status,
                reason : payResult.reason
              }
            })
          }
        }
      })
   
}
  
const generateCustomerID = function (customerEmail, customerPhone) {
  var emailString = customerEmail.split('@')[0];
  var phoneString = customerPhone.substring(customerPhone.length-4);

  const customerID = emailString + '-' + phoneString;
  return customerID;
};

const generateOrderID = function () {
  var currentTime = sd.format(new Date().getTime, 'YYYYMMDDHHmmss');
  const now = new Date();
  let milliseconds = now.getMilliseconds();

  if (milliseconds >= 0 && milliseconds <= 9) {
      milliseconds = "00" + milliseconds;
  } else if (milliseconds >= 10 && milliseconds <= 99) {
      milliseconds = "0" + milliseconds;
  }

  let randomNum = '';
  for(var i = 0; i < 3; i++){
      randomNum+=Math.floor(Math.random()*10);
  }

  const orderID = currentTime + milliseconds + randomNum.toString();
  return orderID;
};
