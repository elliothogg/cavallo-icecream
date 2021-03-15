//If login credentials are correct, then {code:1} is returned. If credentials are invalid, then {code:0} is returned.

var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.post('/api/company-portal', urlendodedParser, function(req, res, next){
	var data = req.body;
	console.log("********req.body***********");
	console.log(data);
    var username = req.body.username;
	var password = req.body.password;
	console.log("********req.body.username***********");
	console.log(username);
	console.log("********req.body.password***********");
	console.log(password);

    return queryUserInfo(username, password, (err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
		console.log("post success")
        console.log(data)
		res.end(JSON.stringify(data))
    })
})

module.exports = router;

function queryUserInfo(username, password, callback){
	console.log("queryUserInfo parameter values: " + username + "    " + password);
    let sql = `select Username, Password from CompanyUser where Username='${username}' and Password = '${password}'`;
    connection.query(sql, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
				var resultJson = JSON.stringify(results);
                callback(null, {
                    code: 1
                });
            } else {
                callback(null, {
                    code: 0
                });
            }
        }
    })

}