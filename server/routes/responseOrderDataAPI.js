var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/responseOrderData', urlendodedParser, function(req, res, next){
    var orderID = req.query.orderID;
    console.log("OrderID:" + orderID)

    return queryOrdersAndEachOrdersProductsInfo(orderID, (err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
		console.log("get success")
        var resString = JSON.stringify(data.res);
        var resJSON = JSON.parse(resString);
        var finalJSON = {
            orderJSON : resJSON[0].orders,
            eachOrdersProductsJSON : resJSON[1].eachOrdersProducts,
        }
        console.log(finalJSON);
        res.send(finalJSON);
    })
})

module.exports = router;

function queryOrdersAndEachOrdersProductsInfo(orderID, callback){
    return Promise.all([
        queryOrdersInfo(orderID),
        queryEachOrdersProductsInfo(orderID)
    ]).then((response)=>{
        return callback(null,{
            res: response
        });
    }).catch((error) => {
        console.log(error);
    })
}

let queryOrdersInfo = function (orderID){
    var sql = `SELECT * FROM Orders WHERE orderID = '${orderID}'`;
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, resOrders) => {
            if (err) {
                reject();
                console.log(err);
            } else {
               resolve({orders:resOrders});
            }
        })
    })
}

let queryEachOrdersProductsInfo = function (orderID){
    var sql = `SELECT * FROM EachOrdersProducts WHERE orderID = '${orderID}'`;
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, resEachOrdersProducts) => {
            if (err) {
                reject();
                console.log(err);
            } else {
               resolve({eachOrdersProducts:resEachOrdersProducts});
            }
        })
    })
}
