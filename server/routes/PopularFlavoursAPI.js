var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/popularFlavours', urlendodedParser, function(req, res, next){

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
    let sql = ` SELECT ProductID, Flavour,SUM(Quantity) as totalPurchased
                FROM 
    
                (SELECT EachOrdersProducts.ProductID, Product.Flavour, EachOrdersProducts.Size, EachOrdersProducts.Quantity 
                FROM EachOrdersProducts 
                INNER JOIN Product ON EachOrdersProducts.ProductID=Product.ProductID) as items
                
                GROUP BY ProductID
                ORDER BY totalPurchased DESC;
                
                `;
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

// let sql = `SELECT EachOrdersProducts.ProductID,SUM(EachOrdersProducts.Quantity) as totalPurchased
// FROM EachOrdersProducts
// GROUP BY ProductID 
// ; `;