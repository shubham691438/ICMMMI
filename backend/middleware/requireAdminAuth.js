const jwt = require('jsonwebtoken')
const Admin=require('../models/adminModel')
require('dotenv').config()

const requireAuth = async (req, res, next) => {

  // verify admin is authenticated

  //checking is authorization token is present in header
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, process.env.SECRET_JWT_KEY)

    req.user = await Admin.findOne({ _id:id })
    
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth