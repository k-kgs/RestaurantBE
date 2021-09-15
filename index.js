//const bodyParser = require('body-parser');
const express = require('express');
//const cors = require('cors');
var app                           = express();
app.use(express.json());
app.use(express.urlencoded());
//app.use(cors);

global.app                        = app;
//const bodyParser = require('body-parser');
//app.use(bodyParser);

require('./services');

require('./modules');
//var jsonParser = bodyParser.json()
//app.use(express.bodyParser());
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App is listening on ${port}: `)
})
const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });
