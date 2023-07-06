const express=require('express')
const router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({msg: "Welcome to API"})
  })

  module.exports=router