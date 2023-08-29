var express = require('express');

var app = express();
var bodyParser = require('body-parser')
var mysql = require('mysql');
app.set('view engine','ejs');
const path = require('path');


let publicpath = path.join(__dirname)
console.log(publicpath);



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ankitk2510",
  database: "Students"

});

var sess;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/task",function(req,res){
  res.sendFile(`${publicpath}/file.html`);
})



app.post('/stu_reg',urlencodedParser,function(req,res){
  console.log(req.body);
  var fname = req.body.first_name;
  var lname = req.body.last_name;
  var email = req.body.email;
  var upassword = req.body.psw;
  var value = [fname,lname,email,upassword];
  var sql = "insert into student (first_name,last_name,email,password) values (?)";
  con.query(sql , [value], function(err){
    if(!err){
      console.log("data inserted");

    }else{
      console.log(err);
    }
  });
  res.render('stu_reg');
})



app.listen(3050);
