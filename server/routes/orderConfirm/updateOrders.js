var connection = require('../../mysql/database');
var sd = require('silly-datetime');

function updateOrders(orderinfo, callback){
    var orderID = generateOrderID();
    var productID = orderinfo.productID;
    var size = orderinfo.size;
    var quantity = orderinfo.quantity;
    var customerEmail = orderinfo.customerEmail;
    var customerPhone = orderinfo.customerPhone;
    var firstname = orderinfo.customerFirstName;
    var lastname = orderinfo.customerFirstName;
    var orderTime = sd.format(new Date().getTime, 'DD/MM/YYYY HH:mm');
    var billingAddress = orderinfo.billingAddress;
    var billingPostcode = orderinfo.billingPostcode;
    var totalcost = orderinfo.totalCost;
    var deliveryOrCollection = orderinfo.deliveryOrCollection;

    var collectionTime = orderinfo.CollectionTime;
    var deliveryTime = orderinfo.DeliveryTime;
    var deliveryAddress = orderinfo.DeliveryAddress;
    var deliveryPostcode = orderinfo.DeliveryPostcode;
    var driverInstructions = orderinfo.DriverInstructions;

    return new Promise(async function (resolve, reject){
        await updateOrdersTable(orderID, customerEmail, customerPhone, firstname, lastname, orderTime, billingAddress, billingPostcode, totalcost, deliveryOrCollection);
        await updateEachOrdersProductsTable(orderID, productID, size, quantity);
        await insertDeliveryOrCollection(deliveryOrCollection, orderID, deliveryTime, collectionTime, deliveryAddress, deliveryPostcode, driverInstructions);
        resolve();
    }).then((response)=>{
        return callback(response);
    }).catch((error) => {
        console.log(error);
    })
}

let updateOrdersTable = function (orderID, customerEmail, customerPhone, firstname, lastname, orderTime, billingAddress, billingPostcode, totalcost, deliveryOrCollection){
    var sql = `insert into Orders(OrderID, CustomerEmail, CustomerPhone, CustomerFirstName, CustomerLastName, OrderTime, BillingAddress, BillingPostCode, TotalCost, DeliveryOrCollection)`+
            `values('${orderID}', '${customerEmail}', '${customerPhone}', '${firstname}', '${lastname}', '${orderTime}', '${billingAddress}', '${billingPostcode}', '${totalcost}', '${deliveryOrCollection}')`;
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, res) => {
            if (err) {
                reject();
                console.log('------Error-------');
            } else {
               resolve()
               console.log('Insert Orders Finish.')
            }
        })
    })
}

let updateEachOrdersProductsTable = function (orderID, productID, size, quantity){
    var sql = `insert into EachOrdersProducts(OrderID, ProductID, Size, Quantity)`+
            `values('${orderID}', '${productID}', '${size}', '${quantity}')`;
    
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, res) => {
            if (err) {
                reject()
                console.log('------Error-------')
                console.log(err);
            } else {
               resolve()
               console.log('Insert EachOrdersProducts Finish.')
            }
        })
    })
    
}

let updateDeliveryTable = function (orderID, deliveryTime, deliveryAddress, deliveryPostcode, driverInstructions){
    var sql = `insert into Delivery(OrderID, DeliveryTime, DeliveryAddress, DeliveryPostcode, DriverInstructions)`+
        `values('${orderID}', '${deliveryTime}', '${deliveryAddress}', '${deliveryPostcode}', '${driverInstructions}')`;
    
    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, res) => {
            if (err) {
                reject()
                console.log('------Error-------')
            } else {
               resolve()
               console.log('Insert Delivery Finish.')
            }
        })
    })
}

let updateCollectionTable = function (orderID, collectionTime){
    var sql = `insert into Collection(OrderID, CollectionTime)`+
            `values('${orderID}', '${collectionTime}')`;

    return new Promise((resolve, reject)=>{
        connection.query(sql, (err, res) => {
            if (err) {
                reject()
                console.log('------Error-------')
            } else {
               resolve()
               console.log('Insert Collection Finish.')
            }
        })
    })
}

let insertDeliveryOrCollection = function(deliveryOrCollection, orderID, deliveryTime, collectionTime, deliveryAddress, deliveryPostcode, driverInstructions){

    return new Promise(async function(resolve, reject){
        if(deliveryOrCollection === "delivery"){
            await updateDeliveryTable(orderID, deliveryTime, deliveryAddress, deliveryPostcode, driverInstructions);
            console.log('ok');
            resolve();
        }else if(deliveryOrCollection === "collection"){
            await updateCollectionTable(orderID, collectionTime);
            resolve();
        }else{
            console.log('Insert D or C Error');
            reject();
        }
    })
}

const generateOrderID = function () {
    var currentTime = sd.format(new Date().getTime, 'YYYYMMDDHHmmss');
    const now = new Date();
    let milliseconds = now.getMilliseconds();

    if (milliseconds >= 0 && milliseconds <= 9) {
        milliseconds = "00" + milliseconds;
    } else if (milliseconds >= 10 && milliseconds <= 99) {
        milliseconds = "0" + milliseconds;
    }

    let randomNum = '';
    for(var i = 0; i < 3; i++){
        randomNum+=Math.floor(Math.random()*10);
    }

    const orderID = currentTime + milliseconds + randomNum.toString();
    return orderID;
  };

  module.exports = updateOrders;