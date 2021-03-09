const axios = require('axios');
var sd = require('silly-datetime');
function payThroughHorsePay(storeID, totalCost, curCode, orderinfo, callback){
    const url = 'http://homepages.cs.ncl.ac.uk/daniel.nesbitt/CSC8019/HorsePay/HorsePay.php';
    var customerEmail = orderinfo.customerEmail;
    var customerPhone = orderinfo.customerPhone;
    var customerID = generateCustomerID(customerEmail, customerPhone);

    return axios.post(url, {
        //these information should get from frontend
        'storeID' : storeID,
        'customerID' : customerID,
        'date' : sd.format(new Date().getTime, 'DD/MM/YYYY'),
        'time' : sd.format(new Date().getTime, 'HH:mm'),
        'timeZone' : 'GMT',
        'transactionAmount' : totalCost,
        'currencyCode' : curCode
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

const generateCustomerID = function (customerEmail, customerPhone) {
    var emailString = customerEmail.split('@')[0];
    var phoneString = customerPhone.substring(customerPhone.length-4);

    const customerID = emailString + '-' + phoneString;
    return customerID;
};

module.exports = payThroughHorsePay;