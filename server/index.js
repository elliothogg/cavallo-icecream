const express = require('express');
const pino = require('express-pino-logger')();
const path = require('path');
const app = express();
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
 

const distanceAPI = require('./routes/distanceApi');
const getCurrentTime = require('./routes/getCurrentTime');
const companyPortal = require('./routes/companyPortal');
const companyPortalData = require('./routes/companyPortalData');
const restaurantInfo = require('./routes/companyInformation');
const orderConfirmAPI = require('./routes/orderConfirm/orderConfirmAPI');
const productMenu = require('./routes/productMenu');
const responseOrderDataAPI = require('./routes/responseOrderDataAPI');
const responseEachOrdersProductAPI = require('./routes/responseEachOrdersProductAPI');
const popularFlavours = require('./routes/PopularFlavoursAPI');
const deliveryInfo = require('./routes/deliveryInfo');
const collectionInfo = require('./routes/collectionInfo');
const responseDeliveryDataAPI = require('./routes/responseDeliveryDataAPI.js');

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
app.use(popularFlavours);
app.use(deliveryInfo);
app.use(collectionInfo);
app.use(responseDeliveryDataAPI);

app.listen(PORT, () =>
    console.log(`Express server is running on port ${PORT}!`)
  );
