const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios');
const connection = require('./database')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);


app.get('/api/check-postcode', (req, res) => {
  const destination = req.query.destination;
  
  return getPostcode(destination, (err, data) => {
    if (err) return res.send(400);//upstream request failed
    
    res.setHeader('Content-Type', 'application/json');
    res.send( {distance: data });
  });

});



// sends a GET request to Distance Matrix API
function getPostcode(destinationIn, callback) {
  const hostName = 'https://maps.googleapis.com';
  const path = '/maps/api/distancematrix/json?units=imperial&';
  const origin = 'NE250DN'; //This is a temporary value. The real value will be pulled from the Database
  const destination = destinationIn;
  const apiKey = 'AIzaSyCnVnG4dZgI0DIiCAzrfip9GofJsIkrJj8'
  const url = `${hostName}${path}origins=${origin}&destinations=${destination}&key=${apiKey}`;
 
  console.log(url);
  return axios.get(url)
  .then(response => {
    console.log(JSON.stringify(response.data.rows[0].elements[0].distance.text));
    callback(undefined, response.data.rows[0].elements[0].distance.text.slice(0, -3));
  })
  .catch(error => {
    console.log(error);
    return callback(error)
  });
}


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);


// connection.query(
//   "CREATE TABLE People (LastName varchar(255),FirstName varchar(255))",
//   function(error, results, fields) {
//     if (error) throw error;
//     console.log('records inserted')
//   }
// );


// connection.query(
//   "INSERT into People (LastName, FirstName) VALUES ('elliot', 'hogg') ",
//   function(error, results, fields) {
//     if (error) throw error;
//     console.log('records inserted')
//   }
// );

// connection.query(
//   "SELECT * FROM People",
//   function(error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   }
// );
