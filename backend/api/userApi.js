const express=require('express')
const {
    register
}=require('../controllers/userController')

const router=express.Router()

//register post request to create a new user in db
router.post('/register',register)

//signin post request to authenticate a current user
// router.post('/signin',signin)

module.exports=router