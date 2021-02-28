var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/api/payment', (req, res) => {
    return payThroughHorsePay((err, data) => {
        if (err) return res.send(400);
        res.end();
      });
    });
module.exports = router;

function payThroughHorsePay(callback){
    const url = 'http://homepages.cs.ncl.ac.uk/daniel.nesbitt/CSC8019/HorsePay/HorsePay.php';

    return axios.post(url, {
        //these information should get from frontend
        'storeID' : 'Team05',
        'customerID' : 'abc123',
        'date' : '01/12/2021',
        'time' : '12:00',
        'timeZone' : 'GMT',
        'transactionAmount' : 15.99,
        'currencyCode' : 'GBP'
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
        return callback(error);
    });
}