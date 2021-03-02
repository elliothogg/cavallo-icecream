var express = require('express');
var router = express.Router();
var connection = require('../mysql/database');

router.get('/api/restaurant-information', (req, res) => {
    return getRestaurantInfo((err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
        console.log(data);
        res.send(data);
      });
    });

module.exports = router;

    function getRestaurantInfo(callback) {
        let sql = 'SELECT * FROM RestaurantInfo';
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