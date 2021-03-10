var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/responseOrderData', urlendodedParser, function(req, res, next){
    var orderID = req.query.orderID;
    console.log("OrderID:" + orderID)

    return queryOrderInfo(orderID, (err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
		console.log("get success")
        console.log(data)
		res.send(data)
    })
})

module.exports = router;

function queryOrderInfo(orderID, callback){
    let sql1 = `SELECT * FROM Orders WHERE OrderID = '${orderID}'`;
    
    connection.query(sql1, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                let ordersJSON = results; 
                console.log("******************** queryOrderInfo results *****************");
                console.log(ordersJSON);

                queryEachOrdersProductsInfo(orderID, ordersJSON,function(err, resultsData, fieldsData){
                    if (err) {
                        callback(err);
                    } else {
                        console.log("******************** queryOrderInfo resultsData *****************");
                        console.log(resultsData);
                        callback(null, {
                            code: 1,
                            data:resultsData
                        });
                    }
                });
            } else {
                callback(null, {
                    code: 1
                });
            }
           
        }
    })
}

function queryEachOrdersProductsInfo(orderID, ordersJSON, callback){
    let sql2 = `SELECT * FROM EachOrdersProducts WHERE OrderID = '${orderID}'`;
    connection.query(sql2, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                console.log("********************queryEachOrdersProductsInfo*****************");
                console.log(results);
                callback(null, {
                    orders : ordersJSON,
                    eachOrdersProduct : results                    
                });
            } else {
                callback(null, {
                    code: 1
                });
            }
        }
    })
}