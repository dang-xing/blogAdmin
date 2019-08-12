const express=require('express');
const app=express();
const articleApi = require('./api/articeApi');
const loginApi = require('./api/loginApi');
const bodyParser = require('body-parser');
app.use(require('cors')())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/api/articleApi',articleApi);
app.use('/api/loginApi',loginApi);
app.listen(8082,function () {
  console.log('localhost:8082')
})
