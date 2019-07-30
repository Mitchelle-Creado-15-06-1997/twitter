var mysql= require('mysql');
let connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'abc123',
    database: 'twitter1'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected");
});

module.exports =connection;