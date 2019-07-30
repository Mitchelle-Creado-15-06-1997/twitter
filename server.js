const express=require('express');
const app = express();
const Joi = require('joi');
var mysql= require('mysql');
var bodyParser = require('body-parser');
//var routes = require('./route.js');
var connection= require('./connect.js');
var session = require('express-session');
var path = require('path');

app.use(express.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/css', express.static(__dirname + '/css'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
     //response.render('./index.html');
});

app.get('/registration.html', function(request, response) {
	response.sendFile(path.join(__dirname + '/registration.html'));
     //response.render('./index.html');
});


app.post('/auth', function(request, response) {
	var user_handle = request.body.user_handle;
	var password = request.body.password;
	if (user_handle && password) {
		connection.query('SELECT * FROM user WHERE user_handle = ? AND password = ?', [user_handle, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.user_handle = user_handle;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



app.post('/auth2',function(request,response){
	var user_handle = request.body.user_handle;
	var password = request.body.password;
	var Name = request.body.Name;
	var email = request.body.email;
const courses={
	user_handle,
	password,
	Name,
	email
	

};
	connection.query(`INSERT INTO user set?`,[courses])
	response.sendFile(path.join(__dirname + '/login.html'));

	console.log(user_handle);
})

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.user_handle + '!');
        //response.redirect('login.html');
		//console.log("hii");
          //response.render('index.html');
		//response.sendFile(path.join(__dirname + '/login.html'));
        
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}`));
module.exports = app;
