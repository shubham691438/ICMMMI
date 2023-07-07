const express=require('express')
const {
    register,
    getAllUsers
}=require('../controllers/userController')

const router=express.Router()

//register post request to create a new user in db
router.post('/register',register)

//signin post request to authenticate a current user
// router.post('/signin',signin)

//get all the users
router.get('/get-all-users',getAllUsers)

module.exports=router