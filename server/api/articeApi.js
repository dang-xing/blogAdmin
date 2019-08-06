const express=require('express')
const router=express.Router()
router.get('/articlelist',function (req,res) {
  res.send('ok')
})
module.exports=router;
