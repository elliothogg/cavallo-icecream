const axios = require('axios');
var sd = require('silly-datetime');
function payThroughHorsePay(storeID, totalCost, customerID, callback){
    const url = 'http://homepages.cs.ncl.ac.uk/daniel.nesbitt/CSC8019/HorsePay/HorsePay.php';
    
    return axios.post(url, {
        //these information should get from frontend
        'storeID' : storeID,
        'customerID' : customerID,
        'date' : sd.format(new Date().getTime, 'DD/MM/YYYY'),
        'time' : sd.format(new Date().getTime, 'HH:mm'),
        'timeZone' : 'GMT',
        'transactionAmount' : totalCost,
        'currencyCode' : "GBP"
    })
    .then((response) => {
        console.log("**********payThroughHorsePay****response*********");
        console.log(response.data);
        return callback(null,response.data);
    })
    .catch((error) => {
        console.log("**********payThroughHorsePay****error*********");
        console.log(error);
        return callback(error);
    });
}

module.exports = payThroughHorsePay;