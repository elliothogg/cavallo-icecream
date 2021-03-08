const express = require('express');
const pino = require('express-pino-logger')();

var bodyParser = require('body-parser');
 

const distanceAPI = require('./routes/distanceApi');
const companyPortal = require('./routes/companyPortal');
const restaurantInfo = require('./routes/companyInformation');
const orderConfirmAPI = require('./routes/orderConfirm/orderConfirmAPI');
const productMenu = require('./routes/productMenu');

const app = express();
app.use(pino);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(distanceAPI);
app.use(companyPortal);
app.use(restaurantInfo);
app.use(productMenu);
app.use(orderConfirmAPI);

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
  );


