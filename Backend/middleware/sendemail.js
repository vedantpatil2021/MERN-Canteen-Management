const nodemailer = require('nodemailer');

const sendemail = async (subject,message,send_to,sent_from) =>{    
        let transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: 587,
          auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
          },
        });
        console.log("Hi im from middleware,",message,send_to,sent_from,subject)
        let info = await transporter.sendMail({
          from: sent_from, // sender address
          to: send_to, // list of receivers
          subject: subject, // Subject line
          html: message, // html body
        });

        transporter.sendMail(info, function(err,i){
            if (err){
                console.log(err)
            }
            else{
                console.log(i)
            }
        })
      
}

module.exports = sendemail;