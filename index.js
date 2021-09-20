//const bodyParser = require('body-parser');
const express = require('express');
var app                           = express();
app.use(express.json());
app.use(express.urlencoded());

global.app                        = app;
//const bodyParser = require('body-parser');
//app.use(bodyParser);

require('./services');

require('./modules');
//var jsonParser = bodyParser.json()
//app.use(express.bodyParser());

app.listen(5000, ()=>{
    console.log("App is listening on 5000: ")
})












































































































// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
// var config = require('./config/loginCreds.json')
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   var dbo = db.db("dbfirst");
//   obj={
//       name:"kgs",
//       role:"Tech"
//   };
//   var myobj = [
//     { name: 'John', address: 'Highway 71'},
//     { name: 'Peter', address: 'Lowstreet 4'},
//     { name: 'Amy', address: 'Apple st 652'},
//     { name: 'Hannah', address: 'Mountain 21'},
//     { name: 'Michael', address: 'Valley 345'},
//     { name: 'Sandy', address: 'Ocean blvd 2'},
//     { name: 'Betty', address: 'Green Grass 1'},
//     { name: 'Richard', address: 'Sky st 331'},
//     { name: 'Susan', address: 'One way 98'},
//     { name: 'Vicky', address: 'Yellow Garden 2'},
//     { name: 'Ben', address: 'Park Lane 38'},
//     { name: 'William', address: 'Central st 954'},
//     { name: 'Chuck', address: 'Main Road 989'},
//     { name: 'Viola', address: 'Sideway 1633'}
//   ];
//   dbo.collection("collection1").insertMany(myobj, (err,res)=>{
//       if(err) throw err;
//       console.log("First collection !");
//     });
//     //   var showObj = dbo.collection("collection1").find({name:"kgs"});
//     dbo.collection("collection1").find({}).toArray((err,res)=>{
//         if(err) throw err;
//         console.log(res);
//     })
//       //console.log(showObj);
//       db.close();
  
//   //db.close();
// });