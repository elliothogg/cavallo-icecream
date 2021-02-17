var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/api/check-postcode', (req, res) => {
    const destination = req.query.destination;
    return getPostcode(destination, (err, data) => {
        if (err) return res.send(400);//upstream request failed
        
        res.setHeader('Content-Type', 'application/json');
        res.send( {distance: data });
      });
    });
module.exports = router;

    function getPostcode(destinationIn, callback) {
        const hostName = 'https://maps.googleapis.com';
        const path = '/maps/api/distancematrix/json?units=imperial&';
        const origin = 'NE250DN'; //This is a temporary value. The real value will be pulled from the Database
        const destination = destinationIn;
        const apiKey = 'AIzaSyCnVnG4dZgI0DIiCAzrfip9GofJsIkrJj8'
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
        });
      }