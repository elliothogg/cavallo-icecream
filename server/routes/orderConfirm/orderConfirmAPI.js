var express = require('express');
var router = express.Router();
const payThroughHorsePay = require('./payThroughHorsePay');
const updateOrders = require('./updateOrders');

router.post('/api/orderConfirm', (req, res) => {
    var storeID = req.body.storeID;
    var totalCost = req.body.TotalCost;
    var curCode = req.body.currencyCode;
    var orderinfo = req.body.orderinfo;

    return orderConfirm(storeID, totalCost, curCode, orderinfo, (err, data) =>{
        if (err) return res.send(400);
    });
  });
module.exports = router;

function orderConfirm(storeID, totalCost, curCode, orderinfo, callback){
    
}
    


