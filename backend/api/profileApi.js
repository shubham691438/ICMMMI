const express=require('express')
const User=require('../models/UserModel')
const Profile=require('../models/ProfileModel')
const CipherMap=require('../models/CipherMapModel')
const {
    updateProfileImg,
    updateAboutMe,
    updateCipherMap,
    updateSocialMedia,
    updateProfessionalInfo,
    updateInterests,
    updatePassword,
    getFollowers
}= require('../controllers/profileController')
const requireAuth=require('../middleware/requireAuth')
const multer = require('multer');


const router=express.Router()

// Update user's profile image

// set up storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use('/image',upload.single('profileImg'))
router.put('/image',requireAuth,updateProfileImg)

// Update user's about me section
router.put('/about-me',requireAuth,updateAboutMe)

// Update user's cipher map
router.put('/cipher-map',requireAuth,updateCipherMap)

// Update user's social media links
router.put('/social-media',requireAuth,updateSocialMedia)

// Update professional information
router.put('/professional-info',requireAuth,updateProfessionalInfo)

//update interests
router.put('/interests',requireAuth,updateInterests)

//update password
router.put('/password',requireAuth,updatePassword)

//get followers
router.get('/followers',requireAuth,getFollowers)

module.exports=router


