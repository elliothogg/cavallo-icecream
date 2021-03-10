var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const updateOrders = require('./orderConfirm/updateOrders')
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.post('/api/responseOrderDataToFE', urlendodedParser, function(req, res, next){
    var orderID = updateOrders.data.orderID;
    console.log("OrderID:" + orderID)

    return responseDataToFE(orderID, (err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
		console.log("post success")
        console.log(data)
		res.end(data)
    })
})

module.exports = router;

function responseDataToFE(orderID, callback){
    let sql = `select * from Orders, EachOrdersProducts where OrderID = '${orderID}'`;

    connection.query(sql, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                callback(null, {
                    data: results
                });
            } else {
                callback(null);
            }
        }
    })
    
}
