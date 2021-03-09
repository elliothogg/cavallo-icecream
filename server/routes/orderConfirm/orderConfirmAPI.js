var express = require('express');
var router = express.Router();
const payThroughHorsePay = require('./payThroughHorsePay');
const updateOrders = require('./updateOrders');

router.post('/api/orderConfirm', (req, res) => {
    console.log(req.body);
    var storeID = req.body.storeID;
    var curCode = req.body.currencyCode;
    var orderinfo = req.body.orderinfo;
    
    return orderConfirm(storeID, orderinfo.totalCost, curCode, orderinfo, (err, data) =>{
        if (err) return res.send(400);
        res.setHeader('Content-Type', 'application/json');
		    console.log("post success");
        console.log(data.res);
		    res.end(data.res);
    });
  });
module.exports = router;

function orderConfirm(storeID, totalCost, curCode, orderinfo, callback){
  payThroughHorsePay(storeID, totalCost, curCode, orderinfo, function(err, data){
        if(err){
          console.log(err);
          return callback(err)
        }else{
          console.log("**********payThroughHorsePay****data*********");
          console.log(data);
          var payResult = data.paymetSuccess;
          if(payResult.Status === true){
            console.log("**********call updateOrders*************");
            updateOrders(orderinfo, function(err, data){
              if(err){
                return callback(err)
              }else{
                console.log("ALL Success");
                return callback(null, {
                  res: 'Payment Success.'
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
    
