const express=require('express');
const router=express.Router();
const models=require('./db');
const mysql=require('mysql');
const conmont=mysql.createConnection(models.mysql);
conmont.connect();

router.post('/login',function (req,res) {
  console.log(req.body)
  const username=req.body.name;
  const password=req.body.password;

  const userSql=`SELECT * from tab_admin_user WHERE user="${username.toString()}"`;

  conmont.query(userSql,function (err,result) {
    if(err){
      res.send({
        code:0,
        message:'用户名错误！！'
      })
    }else{
      const data=result;
      if(data[0].password==password){
        res.send({
          code:1,
          message: "登录成功！"
        })
      }else{
        res.send({
          code:0,
          message:"密码不正确！"
        })
      }
    }
  })


})

module.exports=router;
