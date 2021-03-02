//product menu

var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/productMenu', urlendodedParser, function(req, res, next){
	var data = req.query;
	console.log("********req.query***********");
	console.log(data);

    return queryProductInfo((err, data) => {
        if (err) return res.send(400);//upstream request failed
		console.log("get success")
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
})

module.exports = router;

function queryProductInfo(callback){
    let sql = 'SELECT * FROM Product';
    connection.query(sql, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
				var resultJson = JSON.stringify(results);
                callback(null, {
                    code: 0,
	                data: resultJson
                });
            } else {
                callback(null, {
                    code: 1
                });
            }
        }
    })

}