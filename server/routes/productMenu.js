//product menu

var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/productMenu', urlendodedParser, function(req, res, next){
	
    return queryProductAndSizeInfo((err, data) => {
        if (err) return res.send(400);//upstream request failed
		console.log("get success");
        res.setHeader('Content-Type', 'application/json');
        var resString = JSON.stringify(data.res);
        console.log(resString);
        var resJSON = JSON.parse(resString);
        console.log("_________________"+resJSON);
        var finalJSON = {
            productJSON : resJSON[0].product,
            sizeJSON : resJSON[1].size,
        }
        console.log(finalJSON);
        res.send(finalJSON);
    })

})

module.exports = router;

function queryProductAndSizeInfo(callback){
    return Promise.all([
        queryProductInfo(),
        querySizeInfo()
    ]).then((response)=>{
        return callback(null,{
            res: response
        });
    }).catch((error) => {
        console.log(error);
    })
}

let queryProductInfo = function (){
    var sql = `SELECT * FROM Product ORDER BY ProductID`;
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, resProduct) => {
            if (err) {
                reject();
                console.log(err);
            } else {
               resolve({product:resProduct});
            }
        })
    })
}

let querySizeInfo = function (){
    var sql = `SELECT * FROM Size ORDER BY Price`;
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, resSize) => {
            if (err) {
                reject();
                console.log(err);
            } else {
               resolve({size:resSize});
            }
        })
    })
}
