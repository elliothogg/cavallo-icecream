var express = require('express');
var router = express.Router();
const payThroughHorsePay = require('./payThroughHorsePay');
const updateOrders = require('./updateOrders');

router.post('/api/orderConfirm', (req, res) => {
    console.log(req.body);
    var inParam = req.body[0];
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
    
    return orderConfirm(inParam, (err, data) =>{
        if (err) return res.send(400);
        res.setHeader('Content-Type', 'application/json');
		    console.log("post success");
        console.log(data.res);
		    res.end(data.res.toString());
      });
    });
module.exports = router;

function orderConfirm(inParam, callback){ 
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
            updateOrders(inParam, customerEmail, customerPhone, totalCost, function(err, data){
              if(err){
                return callback(err)
              }else{
                console.log("ALL Success");
                return callback(null, {
                  res:{
                    orderID: data.orderID,
                    resString: "Payment Success"
                  }
                });
              }
            })
          }else{
            console.log("**********call callback*************");
            return callback(null, {
              res:{
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
