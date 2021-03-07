var express = require('express');
var router = express.Router();
const axios = require('axios');
var sd = require('silly-datetime');
const { unstable_renderSubtreeIntoContainer } = require('react-dom');

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
        'date' : sd.format(new Date().getTime, 'DD/MM/YYYY'),
        'time' : sd.format(new Date().getTime, 'HH:mm'),
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
