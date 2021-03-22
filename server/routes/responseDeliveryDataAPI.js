var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });


router.get('/api/responseDeliveryPostcode', urlendodedParser, function(req, res, next){

    return queryOrdersInfo((err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
		console.log("get success")
        console.log(data);
        res.send(data);
    })
})

module.exports = router;

function queryOrdersInfo(callback) {
    let sql = `SELECT  DeliveryPostcode, count(DeliveryPostcode) as count FROM Delivery group by DeliveryPostcode`;
    connection.query(sql, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                callback(null, {
                    code: 0,
                    data: results
                });
            } else {
                callback(null, {
                    code: 1
                });
            }
        }
    })
}