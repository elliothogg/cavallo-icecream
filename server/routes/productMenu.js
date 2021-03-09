//product menu

var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/productMenu', urlendodedParser, function(req, res, next){
	
    return queryProductInfo((err, data) => {
        if (err) return res.send(400);//upstream request failed
		console.log("get success");
        res.setHeader('Content-Type', 'application/json');
        var resString = JSON.stringify(data);
        var resJSON = JSON.parse(resString);
        var finalJSON = {
            productJSON : resJSON.data.product,
            sizeJSON : resJSON.data.size,
        }
        console.log(finalJSON);
        res.send(finalJSON);
    })

})

module.exports = router;

function queryProductInfo(callback){
    let sql1 = `SELECT * FROM Product ORDER BY ProductID`;
    
    connection.query(sql1, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                let productJSON = results; 
                console.log("******************** queryProductInfo results *****************");
                console.log(productJSON);

                queryProductSizeInfo(productJSON,function(err, resultsData, fieldsData){
                    if (err) {
                        callback(err);
                    } else {
                        console.log("******************** queryProductInfo resultsData *****************");
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

function queryProductSizeInfo(productJSON, callback){
    let sql2 = `SELECT * FROM Size ORDER BY Price`;
    connection.query(sql2, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                console.log("********************queryProductSizeInfo*****************");
                console.log(results);
                callback(null, {
                    product : productJSON,
                    size : results                    
                });
            } else {
                callback(null, {
                    code: 1
                });
            }
        }
    })
}

