const { response } = require('express');
var nodemailer = require('nodemailer');
const Config = require('../config/loginCreds.json');
exports.sendMail = sendMail;


async function sendMail(email, link){
    const response = true;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: Config.mailCreds.user,
          pass: Config.mailCreds.passkey
        }
      });

      var mailOptions = {
        from: 'b170090@nitsikkim.ac.in',//could we change it?
        to: email,
        subject: 'Reset Password Link',
        //text: 'That was easy!'
        html: `<h1>Welcome</h1><p>Please reset your password using below link</p><br><a href=${link}>${link}</a>`
      };
      try{
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              response = true;

            } else {
                //console.log("response in ",response);
              console.log('Email sent: ' + info.response);
              
              
    
            }
          });
          return response;
      }catch(err){
        return err;
      }
     
      

}





