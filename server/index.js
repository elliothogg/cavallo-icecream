const express = require('express');
const pino = require('express-pino-logger')();

var bodyParser = require('body-parser');
 

const distanceAPI = require('./routes/distanceApi');
const getCurrentTime = require('./routes/getCurrentTime');
const companyPortal = require('./routes/companyPortal');
const companyPortalData = require('./routes/companyPortalData');
const restaurantInfo = require('./routes/companyInformation');
const orderConfirmAPI = require('./routes/orderConfirm/orderConfirmAPI');
const productMenu = require('./routes/productMenu');
const responseOrderDataAPI = require('./routes/responseOrderDataAPI');
const responseEachOrdersProductAPI = require('./routes/responseEachOrdersProductAPI');

const app = express();
app.use(pino);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(distanceAPI);
app.use(getCurrentTime);
app.use(companyPortal);
app.use(companyPortalData);
app.use(restaurantInfo);
app.use(productMenu);
app.use(orderConfirmAPI);
app.use(responseOrderDataAPI);
app.use(responseEachOrdersProductAPI);

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
  );


