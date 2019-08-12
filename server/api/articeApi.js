const express=require('express')
const models=require('./db')
const router=express.Router()
const mysql=require('mysql')
var multiparty = require('multiparty');
var util = require('util');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
const conmon=mysql.createConnection(models.mysql);
conmon.connect()


//获取文章列表
router.post('/articlelist',function (req,res) {
    if(req.body.pageindex==undefined){
      var  sql = 'SELECT * FROM tab_article LIMIT 0,10';
    }else{
      var sql = `SELECT * FROM tab_article LIMIT ${req.body.pageindex},10`;
    }
    conmon.query(sql,function (err,result) {
      if(err){
        res.send(err)
      }else{
        res.send(result)
      }
    })
})
//获取总行数

router.get('/articleRow',function (req,res) {
  var rowSql="SELECT count(*) AS count FROM tab_article"
  conmon.query(rowSql,function (err,result) {
    if(err){
      res.send(err)
    }else{
      res.send(result)
      //console.log(rows[0].count);
    }
  })
})

//获取编辑文章


//添加文章
router.post('/addArticle',jsonParser,function (req,res) {

      console.log(req.body.id);
      var addSql
     if(req.body.id==undefined){
       addSql='INSERT INTO tab_article(title,class,img_url,details,author,keywords,brief,status,source) VALUES (?,?,?,?,?,?,?,?,?)'
     } else{
       addSql=`UPDATE tab_article SET title = ?,class = ? ,img_url = ?,details = ?,author = ?,keywords = ?,brief = ?,status = ?,source = ? WHERE Id = ${req.body.id}`
     }
    let data=req.body;
    const articleData=[data.title,data.class,data.img_url,data.details,data.author,data.keywords,data.brief,data.status,data.source]
    conmon.query(addSql,articleData,function (err,result) {
        if(err){
          res.send({code:0,title:"系统错误！"})
        }else{
          res.send({code:1,title: '文章添加成功'})
          console.log(result);
        }
    })
});


//删除文章
router.post('/deleteArticle',function (req,res) {
  const id=req.body.id;
  console.log(id);
  const deleteSql=`DELETE FROM tab_article WHERE id=${id}`;
  conmon.query(deleteSql,function (err,result) {
    if(err){
      res.send({
        code:0,
        message:'系统错误！！'
      })
    }else{
      res.send({
        code:1,
        message:'删除成功 ！！'
      })
    }
  })
})

//改变文章状态
router.post('/exitStatus',function (req,res) {
  let data=req.body
  const exitSql=`UPDATE tab_article SET status = ${data.status} WHERE id=${data.id}`;
  conmon.query(exitSql,function (err,result) {
      if(err){
        console.log(err)
        res.send({
          code:0,
          message:'系统错误！！'
        })
      }else{
        res.send({
          code:1,
          message:'文章状态修改成功！'
        })
      }
  })


})

//图片上传
router.post('/file/uploading', function(req, res, next) {
  /* 生成multiparty对象，并配置上传目标路径 */
  var form = new multiparty.Form();
  /* 设置编辑 */

  form.encoding = 'utf-8';
  //设置文件存储路劲
  form.uploadDir = './public/files';
  //设置文件大小限制
  form.maxFilesSize = 2 * 1024 * 1024;
  // form.maxFields = 1000;  //设置所有文件的大小总和
  //上传后处理
  form.parse(req, function(err, fields, files) {
    var filesTemp = JSON.stringify(files, null, 2);
    if(err) {
     // res.send('parse error:' + err);
    }else {
      res.send(files.file[0].path);
    }

  })
})

module.exports=router;
