const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'team5.crgo2bd9ywen.eu-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'pleasework',
  database: 'main'
});

  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
  });

  module.exports = connection;