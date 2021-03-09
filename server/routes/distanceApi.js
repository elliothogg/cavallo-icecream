var express = require('express');
var router = express.Router();
const axios = require('axios');
var connection = require('../mysql/database');

router.get('/api/check-postcode', (req, res) => {
    const destination = req.query.destination;
    return getPostcode(destination, (err, data) => {
        
        res.setHeader('Content-Type', 'application/json');
        
        if (err) res.send( {distance: "err"} );//upstream request failed
        
        res.send( {distance: data });
      });
    });
module.exports = router;

    function getPostcode(destinationIn, callback) {
        const hostName = 'https://maps.googleapis.com';
        const path = '/maps/api/distancematrix/json?units=imperial&';
        const destination = destinationIn;
        const apiKey = 'AIzaSyCnVnG4dZgI0DIiCAzrfip9GofJsIkrJj8'

		return queryPostcode(hostName,path,destination,apiKey,callback);
      }

	  function queryPostcode(hostName,path,destination,apiKey,callback){
        let sql = `select PostCode from RestaurantInfo`;
        connection.query(sql, function(error, results, fields){
            if (error) {
                callback(error);
            } else {
                if (results.length) {
                    console.log('******************results*********************');
					console.log(results);
                    var postcode = JSON.stringify(results);	
					console.log(postcode);
					var resultJson = JSON.parse(postcode);
					var origin = resultJson[0].PostCode;
					console.log(postcode);                    
					const url = `${hostName}${path}origins=${origin}&destinations=${destination}&key=${apiKey}`;  
			        console.log(url);
                    
                    return axios.get(url)
                        .then(response => {
                            console.log(JSON.stringify(response.data.rows[0].elements[0].distance.text));
                            callback(undefined, response.data.rows[0].elements[0].distance.text.slice(0, -3));
                            })
                        .catch(error => {
                        console.log(error);
                        return callback(error)
                        }) 
                } else {
                    callback(null, {
                        code: 1
                    });
                }
            }
        })    
	}
