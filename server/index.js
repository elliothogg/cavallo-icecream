const express = require('express');
const pino = require('express-pino-logger')();


const distanceAPI = require('./routes/distanceApi');
const companyPortal = require('./routes/companyPortal')

const app = express();
app.use(pino);

app.use('/distanceAPI', distanceAPI);
app.use('/', companyPortal);

  
app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
  );


