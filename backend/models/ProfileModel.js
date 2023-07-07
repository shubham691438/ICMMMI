const mongoose=require('mongoose')

const Schema=mongoose.Schema

const ProfileSchema=new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    profileImg:{
        data:Buffer,
        contentType:String
    },
    aboutMe:String,
    cipherMapId:{
        type:Schema.Types.ObjectId,
        ref:'CipherMap'
    },
    socialMedia:{
        linkedin:String,
        github:String,
        facebook:String,
        twitter:String,
        instagram:String,
        website:String
    },
    professionalInfo:{
        higherEdu:String,
        currentWork:String,
    },
    interests:[String],
    followersId:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]

})

module.exports=mongoose.model('Profile',ProfileSchema)