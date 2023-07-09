const express=require('express')
const {
    registerAdmin,
    loginAdmin,
    getAllUsers
}=require('../controllers/adminController')
const requireAdminAuth=require('../middleware/requireAdminAuth')
const router=express.Router()

//register admin
router.post('/register',registerAdmin)

//login admin
router.post('/login',loginAdmin)

//get all the users
router.get('/get-all-users',requireAdminAuth,getAllUsers)

module.exports=router