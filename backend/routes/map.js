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


 
router.get('/',function(req,res,next) {
    //connection.connect();
    var sql = 'select title,lat,lon,stair,elevator,toilet from locations, titles,options where locations.idx = options.idx and locations.idx = titles.idx and lat is not NULL'
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
                temp.stair = rows[i].stair;
                temp.elevator = rows[i].elevator;
                temp.toilet = rows[i].toilet;
                json_list.push(temp);
            }
        }
        res.json(json_list)
    })
    // connection.end();
})
router.post('/update',function(req,res,next) {
    //connection.connect();
    var list = ['stair', 'elevator', 'toilet'];
    for(var i = 0; i<list.length; i++){
        if(req.body[list[i]] == true){
            var sql = "update options set " + list[i] +" = true where idx = (select titles.idx from titles where titles.title = ?)"
            connection.query(sql,[req.body.title], function(err, result, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
            })
        }
    }
    console.log(req.body);
    // connection.end();
    res.send()
})
module.exports = router;