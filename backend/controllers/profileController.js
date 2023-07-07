const User = require('../models/UserModel');
const Profile = require('../models/ProfileModel');
const CipherMap =require('../models/CipherMapModel')
const validator = require('validator');
const bcrypt=require('bcrypt')

// Update user's profile image
const updateProfileImg= async(req,res)=>{
    

    // Validation
    if (!req.file) {
        return res.status(400).json({ error: 'Profile image is required' });
    }

    try {
        // Update user's profile image
        const profile = await Profile.findOneAndUpdate(
        { userId: req.user._id },
        { profileImg: { data: req.file.buffer, contentType: req.file.mimetype } },
        { new: true }
        );

        return res.status(200).json({ message: 'Profile image updated successfully', profile });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

// Update user's about me section
const updateAboutMe=async(req,res)=>{
    const { aboutMe } = req.body;

    // Validation
    if (!aboutMe) {
        return res.status(400).json({ error: 'About Me section is required' });
    }

    try {
        // Update user's about me section
        const profile = await Profile.findOneAndUpdate({ userId: req.user._id }, { aboutMe }, { new: true });
        return res.status(200).json({ message: 'About Me section updated successfully', profile });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

// Update user's cipher map
const updateCipherMap=async(req,res)=>{
    const {date,cipherPoints} = req.body;
    const userId = req.user._id 


    try {
        //find and update cipher map
        const exists=await CipherMap.findOne({profileId:req.user.profileId})
        let cipherMap=null
        
        if(exists){
            dateExists = await CipherMap.findOne(
                { profileId: req.user.profileId, 'info.date': date },
              );
            if(dateExists)
            {
                cipherMap = await CipherMap.findOneAndUpdate(
                    { profileId: req.user.profileId, 'info.date': date },
                    { $set: { 'info.$.cipherPoints': cipherPoints } },
                    { new: true }
                  );
            }
            else{
                cipherMap = await CipherMap.findOneAndUpdate(
                    { profileId: req.user.profileId, 'info.date': { $ne: date } },
                    { $push: { info: { date: date, cipherPoints: cipherPoints } } },
                    { new: true }
                  );
            }
            
        }
        else
        {
            cipherMap=await CipherMap.create(
                {
                    profileId:req.user.profileId,
                    info:{
                        date:date,
                        cipherPoints:cipherPoints
                    }
                }
            )
        }
        
        

        // Update user's submission map
        if(cipherMap){
            const profile = await Profile.findOneAndUpdate({ userId }, { cipherMapId:cipherMap._id }, { new: true });
        }
        
        return res.status(200).json({ message: 'Submission map updated successfully', cipherMap });
     }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

// Update user's social media links
const updateSocialMedia=async(req,res)=>{
    const userId = req.user._id 
    const { linkedin, github, facebook, twitter, instagram, website } = req.body

    try {
        const profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: { socialMedia: { linkedin, github, facebook, twitter, instagram, website } } },
        { new: true }
        )

        if (!profile) {
        throw new Error('Profile not found')
        }


        res.status(200).json({ message:"social media updated succesfully", profile })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: 'Error updating social media links' })
    }
}

// Update professional information
const updateProfessionalInfo=async(req,res)=>{
    try {
        const userId = req.user._id;
        const { higherEdu, currentWork } = req.body;
        
        // Check if profile exists for the user
        const profile = await Profile.findOne({ userId });
        if (!profile) {
          return res.status(404).json({ error: 'Profile not found' });
        }
        
        // Update professional information
        profile.professionalInfo = { higherEdu, currentWork };
        
        // Save the updated profile document
        await profile.save();
        
        return res.status(200).json({ message: 'Professional information updated successfully',profile });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

//update interests
const updateInterests=async(req,res)=>{
    const { interests } = req.body;

    try {
        const profile = await Profile.findOneAndUpdate(
        { userId: req.user._id },
        { interests },
        { new: true }
        );

        if (!profile) {
        return res.status(404).json({ msg: 'Profile not found' });
        }

        res.status(200).json("interests updated successfully",profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

//update password
const updatePassword=async(req,res)=>{
    try {
        const { email, oldPassword, newPassword } = req.body;
    
        // Check if all required fields are provided
        if (!email || !oldPassword || !newPassword) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if old password is correct
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
          return res.status(401).json({ message: 'Incorrect old password' });
        }
    
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
    
        // Update user's password
        user.password = hashedPassword;
        await user.save();
    
        return res.json({ message: 'Password updated successfully' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
}

//get followers
const getFollowers=async(req,res)=>{

}

module.exports={
    updateProfileImg,
    updateAboutMe,
    updateCipherMap,
    updateSocialMedia,
    updateProfessionalInfo,
    updateInterests,
    updatePassword,
    getFollowers
}