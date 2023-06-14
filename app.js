var express = require('express');
var app = express();
const routes = require('./routes');
require('dotenv').config();
const port  = process.env.PORT;
const host  = process.env.HOST;


// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.listen(port, function(){
  console.log(`[HTTP] Server is running at ${host}:${port}`);
  console.log(`[HTTP] Press CTRL + C to stop it`);
});