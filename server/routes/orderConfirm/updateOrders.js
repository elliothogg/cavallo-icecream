var connection = require('../../mysql/database');
var sd = require('silly-datetime');

function updateOrders(orderinfo, callback){
    var orderID = generateOrderID;
    var productID = orderinfo.ProductID;
    var size = orderinfo.Size;
    var quantity = orderinfo.Quantity;
    var customerEmail = orderinfo.customerEmail;
    var customerPhone = orderinfo.customerPhone;
    var firstname = orderinfo.customerFirstName;
    var lastname = orderinfo.customerFirstName;
    var orderTime = sd.format(new Date().getTime, 'DD/MM/YYYY HH:mm');
    var billingAddress = orderinfo.BillingAddress;
    var billingPostcode = orderinfo.BillingPostcode;
    var totalcost = orderinfo.TotalCost;
    var deliveryOrCollection = orderinfo.DeliveryOrCollection;

    var deliveryAddress = orderinfo.DeliveryAddress;
    var deliveryPostcode = orderinfo.DeliveryPostcode;
    var driverInstructions = orderinfo.DriverInstructions;

    return
}

function updateOrdersTable(orderID, customerEmail, customerPhone, firstname, lastname, orderTime, billingAddress, billingPostcode, totalcost, deliveryOrCollection, callback){
    var sql = `insert into Orders(OrderID, CustomerEmail, CustomerPhone, CustomerFirstName, CustomerLastName, OrderTime, BillingAddress, BillingPostCode, TotalCost, DeliveryOrCollection)`+
            `values('${orderID}', '${customerEmail}', '${customerPhone}', '${firstname}', '${lastname}', '${orderTime}', '${billingAddress}', '${billingPostcode}', '${totalcost}', '${deliveryOrCollection}')`
    
}

function updateEachOrdersProductsTable(orderID, productID, Size, quantity, callback){
    var sql = `insert into EachOrdersProducts(OrderID, ProductID, Quantity)`+
            `values('${orderID}', '${productID}', '${Size}', '${quantity}')`;
    
}

function updateDeliveryTable(orderID, deliveryTime, deliveryAddress, deliveryPostcode, driverInstructions, callback){
    var sql = `insert into Delivery(OrderID, DeliveryTime, DeliveryAddress, DeliveryPostcode, DriverInstructions)`+
        `values('${orderID}', '${deliveryTime}', '${deliveryAddress}', '${deliveryPostcode}', '${driverInstructions}')`;

}

function updateCollectionTable(orderID, collectionTime, callback){
    var sql = `insert into Collection(OrderID, CollectionTime)`+
            `values('${orderID}', '${collectionTime}')`;
    
}

const generateOrderID = function () {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();

    let randomNum = '';
    for(var i = 0; i < 3; i++){
        randomNum+=Math.floor(Math.random()*10);
    }

    const orderID = (year + month + day + hour + minutes + seconds + milliseconds + randomNum).toString;
    return orderID;
  };

module.exports = updateOrders;