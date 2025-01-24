const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const validator = require('validator')

const Schema=mongoose.Schema

const AdminSchema=new Schema({
    email:String,
    password:String,
})

// static login method
  AdminSchema.statics.login = async function(email, password) {
  
    if (!email) {
      throw Error('Email is required')
    }

    if (!password) {
        throw Error('Password is required')
      }
  
    const admin = await this.findOne({ email })
    if (!admin) {
      throw Error('admin not registered')
    }
  
    const match = await bcrypt.compare(password, admin.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return admin
  }
  
  // static register method
AdminSchema.statics.register = async function(email,password) {

  if(!email){
      throw Error('Email is required')
    }

  if (!validator.isEmail(email)) {
    throw Error('Invalid email address')
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password not strong enough')
  // }
  if(password.length<8)
  {
    throw Error("Password is should be least 8 characters")
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('User is already Registered, Login Now')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const admin = await this.create({email,password:hashedPassword})

  return admin
}

module.exports=mongoose.model('admin',AdminSchema)