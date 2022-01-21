var express = require('express'),
http = require('http'),
path = require('path');
var session = require('express-session');
var app = express();
var mysql= require('mysql');
var bodyParser=require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const nodemailer = require("nodemailer");

//app.use(express.static(path.join(__dirname, 'views')));
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password = post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mobile= post.mobile;
	  if(username !='' && password!='') {
		  var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mobile`,`username`, `password`) VALUES ('" + fname + "','" + lname + "','" + mobile + "','" + username + "','" + password + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Your account has been created succesfully.";
			 res.render('signup.ejs',{message: message});
		  });
	  } else {
		  message = "Username and password is mandatory field.";
		  res.render('signup.ejs',{message: message});
	  }

   } else {
      res.render('signup');
   }
};
 
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password= post.password;
     
      var sql="SELECT  first_name, last_name, username FROM `users` WHERE `username`='"+username+"' and password = '"+password+"'";                           
      db.query(sql, function(err, results){       
         if(results){
            req.session.username = results.username;
            req.session.user = results;
            //console.log(results.username);
            console.log("success");
           
             
            res.sendFile(path.join(__dirname, '../views', 'index.html'));
         }
         else{
            message = 'You have entered invalusername username or password.';
            res.render('login.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('login.ejs',{message: message});
   }
           
};

           
// // exports.dashboard = function(req, res, next){
           
// //    var user =  req.session.user,
// //    username = req.session.username;
// //    console.log('ddd='+username);
// //    if(username == null){
// //       res.redirect("/login");
// //       return;
// //    }

//    var sql="SELECT * FROM `users` WHERE `username`='"+username+"'";

//    db.query(sql, function(err, results){
//       res.render('dashboard.ejs', {data:results});    
//    });       
// };

// exports.profile = function(req, res){

//    var username = req.session.username;
//    if(username == null){
//       res.redirect("/login");
//       return;
//    }

//    var sql="SELECT * FROM `users` WHERE `username`='"+username+"'";          
//    db.query(sql, function(err, result){  
//       res.render('profile.ejs',{data:result});
//    });
// };

exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};