const express=require('express');
const app=express();
const articleApi = require('./api/articeApi');
app.use('/api/articleApi',articleApi);

app.listen(8082,function () {
  console.log('localhost:8082')
})
