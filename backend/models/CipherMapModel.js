const mongoose=require('mongoose')

const Schema=mongoose.Schema

const CipherMapSchema=new Schema({
    profileId:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    info:[{
        date:Date,
        cipherPoints:Number
    }]
})

module.exports=mongoose.model('CipherMap',CipherMapSchema)