const { json } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('mysql')
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'ploteen',
    password : 'dpdltm!@34',
    database : 'bf_free'
})

var sql = 'select title,lat,lon from barrier_free where lat is not NULL'

 
router.get('/',function(req,res,next) {
    //connection.connect();
    connection.query(sql,function(err, rows, fields){
        let json_list = [];
        if(err){
            console.log(err);
        }
        else {
            for(var i =0;i<rows.length;i++){
                var temp = new Object();
                temp.title = rows[i].title;
                temp.lat = rows[i].lat;
                temp.lon = rows[i].lon;
                json_list.push(temp);
            }
        }
        res.json(json_list)
    })
    // connection.end();
})

module.exports = router;