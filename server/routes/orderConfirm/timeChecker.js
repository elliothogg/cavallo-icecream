const e = require('express');
var connection = require('../../mysql/database');

function timechecker(storeID, orderTime, isDelivery, choosenTime, callback){
    var OrderPlacedTime = orderTime.split(' ')[1];
    var OrderPlacedHH = OrderPlacedTime.split(':')[0];
    var OrderPlacedmm = OrderPlacedTime.split(':')[1];

    return queryOpenTime(storeID, (err, data)=>{
        if(isWeekday){
            if(deliveryOrCollection(isDelivery, OrderPlacedHH, OrderPlacedmm, data.data[0].WeekdayOpeningTime, data.data[0].WeekdayClosingTime)){
                if(isDeliveryOrCollectionTimeLaterThanCurrent(OrderPlacedHH, OrderPlacedmm, choosenTime) === true){
                    return callback(null, {
                        Status: true,
                        reason: "True"
                    })
                }else{
                    return callback(null, {
                        Status: false,
                        reason: "Choosing Time invalide"
                    })
                }
            }else{
                return callback(null, {
                    Status: false,
                    reason: "Shop Closed"
                })
            }
        }else{
            if(deliveryOrCollection(isDelivery, OrderPlacedHH, OrderPlacedmm, data.data[0].WeekendOpeningTime, data.data[0].WeekendClosingTime)){
                return callback(null, {
                    Status: true,
                    reason: "Shop Open"
                })
            }else{
                return callback(null, {
                    Status: false,
                    reason: "Shop Closed"
                })
            }
        }
    })
}

function isWeekday(){
    if(new Date().getDay() === 0 || new Date().getDay() === 6){
        return false;
    }else{
        return true;
    }
}

function deliveryOrCollection(isDelivery, OrderPlacedHH, OrderPlacedmm, OpeningTime, ClosingTime){
    if(isDelivery === true){
        if(parseInt(OrderPlacedHH) < parseInt(OpeningTime.split(':')[0]) || parseInt(OrderPlacedHH) >= parseInt(ClosingTime.split(':')[0])){
            console.log("1")
            return false;
        }else{
            console.log("2")
            return true;
        }
    }else{
        if(parseInt(OrderPlacedHH) < parseInt(OpeningTime.split(':')[0]) || ((parseInt(OrderPlacedHH) === parseInt(ClosingTime.split(':')[0])-1) && parseInt(OrderPlacedmm) >= (parseInt(ClosingTime.split(':')[1])+45)) || parseInt(OrderPlacedHH) >= parseInt(ClosingTime.split(':')[0])){
            console.log("3")
            return false;
        }else{
            console.log("4")
            return true;
        }

    }
}

function isDeliveryOrCollectionTimeLaterThanCurrent(OrderPlacedHH, OrderPlacedmm, chooseTime){
    console.log("!!!!!!!!" + chooseTime)
    if(chooseTime === "ASAP"){
        return true;
    }else{
        var chooseHH = chooseTime.split(':')[0];
        var choosemm = chooseTime.split(':')[1].substring(0,1);

        if(chooseHH >= OrderPlacedHH && choosemm > OrderPlacedmm){
            return true;
        }else{
            return false;
        }
    }
}

function queryOpenTime(storeID, callback){
    let sql = `select WeekdayOpeningTime, WeekdayClosingTime, WeekendOpeningTime, WeekendClosingTime from RestaurantInfo where ID = '${storeID}'`;

    connection.query(sql, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                return callback(null, {
                    code: 0,
                    data: results
                });
            } else {
                return callback(null, {
                    code: 1
                });
            }
        }
    })
}


module.exports = timechecker;