const express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

global.app = app;

require('./services');

require('./modules');
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App is listening on ${port}: `)
})
const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });
