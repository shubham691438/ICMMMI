const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const path = require('path')

const indexRouter=require('./api/index')
const userAuthRouter=require('./api/userAuthApi')
const profileApi=require('./api/profileApi')

//initialized express app
const app=express()

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//for api routes
app.use('/api',indexRouter)
app.use('/api/user',userAuthRouter)
app.use('/api/profile',profileApi)

//connect to database and listen to port
port=process.env.PORT||3030
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
          console.log('connected to db')

          // listening to port
          app.listen(port,()=>{
            console.log(`listening to port ${port}`)
            })
        })
        .catch((err)=>{
          console.log(err)
        })

        
