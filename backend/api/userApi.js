const express=require('express')
const {
    login,
    register,
    getUser,
    updateUser
}=require('../controllers/userController')
const requireAuth=require('../middleware/requireAuth')
const router=express.Router()

//register post request to create a new user in db
router.post('/register',register)

// login post request to authenticate a current user
router.post('/login',login)

//authenticated request to get user
router.get('/:id',requireAuth,getUser)

//authenticated request to update user
router.put('/update/:id',requireAuth,updateUser)






module.exports=router