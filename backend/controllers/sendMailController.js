"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()

const sendMail=async(req,res)=>{
    const {senderName,senderEmail,subject,msg}=req.body;

    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.OFFICIAL_EMAIL,
                pass: process.env.PASS
            }
        });

        const data = `From:
  Name: ${senderName}
  Email: ${senderEmail}
Message:
  ${msg}`;
  
          async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: `${senderName} <${senderEmail}>`, // sender address
              to: "icmmmi2024@gmail.com", // list of receivers
              subject: `${subject}`, // Subject line
              text: `${data}`, // plain text body
            });
          
            console.log("Message sent: %s", info.messageId);
            res.status(200).json({msg:"msg sent successfully"})
            
          }
          
          main().catch(console.error);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    
}

module.exports={
    sendMail
}