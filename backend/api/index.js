const express=require('express')
const router=express.Router();
const {sendMail}=require('../controllers/sendMailController')

router.get('/',(req,res)=>{
    res.status(200).json({msg: "Welcome to API"})
  })

router.post('/send-mail',sendMail)

module.exports=router