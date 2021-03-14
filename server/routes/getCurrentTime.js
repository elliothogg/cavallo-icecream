var express = require('express');
const bodyParser = require('body-parser');
var sd = require('silly-datetime');
var router = express.Router();
const urlendodedParser= bodyParser.urlencoded({ extended: false });

router.get('/api/currentTime', urlendodedParser, function(req, res, next){
	
    return getcurrentTime((err, data) => {
        if (err) return res.send(400);//upstream request failed
        res.setHeader('Content-Type', 'application/json');
		console.log("get success")
        console.log(data)
		res.send(data);
    })
})

module.exports = router;

function getcurrentTime(callback){
    var currentTime = sd.format(new Date().getTime, 'DD/MM/YYYY HH:mm:ss');
	return callback(null, {
		curTime: currentTime
	})

}