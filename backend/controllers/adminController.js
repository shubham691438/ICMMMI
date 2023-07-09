const User=require('../models/UserModel')
const Admin=require('../models/adminModel')
const jwt=require('jsonwebtoken')
require('dotenv').config()

//creating json web token
const maxAge=2*24*60*60
const createToken =(id)=>{
    return jwt.sign({id},process.env.SECRET_JWT_KEY,{expiresIn:maxAge})
}


// Admin Login post request
const loginAdmin = async (req, res) => {
    const {email, password} = req.body
    
    try {
      const admin = await Admin.login(email, password)
  
      
      // create a token
      const token = createToken(admin._id)
  
      res.status(200).json({
        adminId:admin._id,
        email:admin.email,
        token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }  

//register post request to create a new admin in db
const registerAdmin = async (req, res) => {
  const {email,password} = req.body

  try {
    const admin = await Admin.register(email,password)

    // create a token
    const token = createToken(admin._id)
    
    res.status(200).json({adminId:admin._id,email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}  

const getAllUsers=async(req,res)=>{
  try{
    const users=await User.find({})
    // console.log(users);
    res.status(200).json(users);
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
}
  
  module.exports={
    registerAdmin,
    loginAdmin,
    getAllUsers
}