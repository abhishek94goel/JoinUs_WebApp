var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
										host: 'localhost',
										user: 'root',
										database: 'join_us'
});
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public')); // consider this folder and all the files inside it as local

var request_count=0;

app.get("/", function(req,res){
							request_count= request_count+1;
							console.log("New Request ! Current Request count : " + request_count);
							//var count = Math.floor(Math.random()*100);
							//res.send("Hey You ! You are " + count + "% MAD. Refresh the page to see new Madness Level !");
							var q = 'SELECT COUNT(*) AS count FROM users';
							connection.query(q, function(error,results){
														if(error) throw error;
														var count = results[0].count;
														//res.send("Our Database currently has: " + count + " users !");
														res.render("home.ejs",{data:count});
											});
							}
	   );

app.post("/register", function(req,res){
						console.log(req.body);
						var person = {email: req.body.email};
						connection.query("INSERT INTO users SET ?", person, function(error,results){
										 //if(error) throw error;
										 //res.send("Thank you ("+ req.body.email + ") from Abhishek to join the Campaign. !");
										 var person = req.body.email;
										 res.render('final.ejs',{entry: person});
										 });
						}
		);

app.listen(3000, function(){
						console.log("Listening the request on port number 3000");
							}
		  );