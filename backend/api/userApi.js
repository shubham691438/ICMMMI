const express=require('express')
const {
    login,
    register,
}=require('../controllers/userController')
const router=express.Router()

//register post request to create a new user in db
router.post('/register',register)

// login post request to authenticate a current user
router.post('/login',login)






module.exports=router