const express=require('express');
const app = express();
const Joi = require('joi');
var mysql= require('mysql');
//var routes = require('./route.js');
var connection= require('./connect.js');
var session = require('express-session');

app.use(express.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));




const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}`));
module.exports = app;