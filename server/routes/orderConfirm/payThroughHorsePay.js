const axios = require('axios');
var sd = require('silly-datetime');
function payThroughHorsePay(storeID, totalCost, curCode, callback){
    const url = 'http://homepages.cs.ncl.ac.uk/daniel.nesbitt/CSC8019/HorsePay/HorsePay.php';

    return axios.post(url, {
        //these information should get from frontend
        'storeID' : storeID,
        'customerID' : generateCustomerID,
        'date' : sd.format(new Date().getTime, 'DD/MM/YYYY'),
        'time' : sd.format(new Date().getTime, 'HH:mm'),
        'timeZone' : 'GMT',
        'transactionAmount' : totalCost,
        'currencyCode' : curCode
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
        return callback(error);
    });
}

const generateCustomerID = function (customerEmail, customerPhone) {
    var emailString = customerEmail.split('@')[0];
    var phoneString = customerPhone.substring(customerPhone.length-4);

    const customerID = (emailString + '-' + phoneString).toString;
    return customerID;
};

module.exports = payThroughHorsePay;