var connection = require('../../mysql/database');
var sd = require('silly-datetime');

function updateOrders(inParam, orderID, customerEmail, customerPhone, totalCost, callback){
    var firstname = inParam.customerDetails.customerFirstName;
    var lastname = inParam.customerDetails.customerLastName;
    var orderTime = sd.format(new Date().getTime, 'DD/MM/YYYY HH:mm');
    var billingAddress = inParam.customerDetails.billingAddress;
    var billingPostcode = inParam.customerDetails.billingPostcode;
    
    var deliveryOrCollection = isDeliveryOrCollection(inParam.customerOrder.isDelivery);

    var collectionTime = inParam.customerDetails.collectionTime;
    var deliveryTime = inParam.customerDetails.deliveryTime;
    var deliveryAddress = inParam.customerDetails.deliveryAddress;
    var deliveryPostcode = inParam.customerDetails.deliveryPostcode;
    var driverInstructions = inParam.customerDetails.driverInstructions;

    var Items = inParam.customerOrder.Items;
    
    return new Promise(async function (resolve, reject){
        await updateOrdersTable(orderID, customerEmail, customerPhone, firstname, lastname, orderTime, billingAddress, billingPostcode, totalCost, deliveryOrCollection);
        await updateEachOrdersProductsTable(orderID, Items);
        await insertDeliveryOrCollection(deliveryOrCollection, orderID, deliveryTime, collectionTime, deliveryAddress, deliveryPostcode, driverInstructions);
        resolve();
    }).then((response)=>{
        return callback(null,{
            orderID: orderID,
            resString: "Payment Success"
        });
    }).catch((error) => {
        console.log(error);
    })
}

let updateOrdersTable = function (orderID, customerEmail, customerPhone, firstname, lastname, orderTime, billingAddress, billingPostcode, totalCost, deliveryOrCollection){
    var sql = `insert into Orders(OrderID, CustomerEmail, CustomerPhone, CustomerFirstName, CustomerLastName, OrderTime, BillingAddress, BillingPostCode, TotalCost, DeliveryOrCollection)`+
            `values('${orderID}', '${customerEmail}', '${customerPhone}', '${firstname}', '${lastname}', '${orderTime}', '${billingAddress}', '${billingPostcode}', '${totalCost}', '${deliveryOrCollection}')`;
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

let updateEachOrdersProductsTable = function (orderID, Items){    
    return new Promise((resolve, reject)=>{
        Items.forEach(function(item,index){    
            var productID = Items[index].productID;
            var size = Items[index].size;
            var quantity = Items[index].quantity;
    
            var sql = `insert into EachOrdersProducts(OrderID, ProductID, Size, Quantity)`+
                `values('${orderID}', '${productID}', '${size}', '${quantity}')`;
                
            connection.query(sql, (err, res) => {
                if (err) {
                    reject()
                    console.log('------Error-------')
                    console.log(err);
                } else {
                    console.log('Insert EachOrdersProducts.')
                }
            })    
        }); 
        resolve();
        console.log('EachOrdersProducts Loop Finish.')
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
        if(deliveryOrCollection === "Delivery"){
            await updateDeliveryTable(orderID, deliveryTime, deliveryAddress, deliveryPostcode, driverInstructions);
            resolve();
        }else if(deliveryOrCollection === "Collection"){
            await updateCollectionTable(orderID, collectionTime);
            resolve();
        }else{
            console.log('Insert D or C Error');
            reject();
        }
    })
}

  const isDeliveryOrCollection = function(isDelivery){
      if(isDelivery === true){
          return 'Delivery';
      }else if(isDelivery === false){
        return 'Collection';
      }else{
          console.log("DeliveryOrCollection Error")
      }
  }

  module.exports = updateOrders;