var express = require('express');
var router = express.Router();
var connection = require('../mysql/database');


module.exports = router;

function queryStoreID(storeID, callback){
    let sql = `select ID from RestaurantInfo`;
    connection.query(sql, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
				storeID = JSON.stringify(results);
                callback(null, {
                    code: 0,
	                data: storeID
                });
            } else {
                callback(null, {
                    code: 1
                });
            }
        }
    })
}
