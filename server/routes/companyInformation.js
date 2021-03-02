var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/restaurant-information', urlendodedParser, (req, res) => {
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