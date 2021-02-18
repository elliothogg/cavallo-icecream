var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var connection = require('../mysql/database');
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.post('/company-portal', urlendodedParser, function(req, res, next){
    const {username, password} = req.body;
    return queryUserInfo(username, password, (err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
        console.log("post success")
    })
})

module.exports = router;

function queryUserInfo(username, password, callback){
    let sql = `select username, password from User where username='${username}' and password = '${password}'`;
    connection.query(sql, function(error, results, fields){
        if (error) {
            callback(error);
        } else {
            if (results.length) {
                callback(null, {
                    code: 0,
	    data: results[0]
                });
            } else {
                callback(null, {
                    code: 1
                });
            }
        }
    })

}