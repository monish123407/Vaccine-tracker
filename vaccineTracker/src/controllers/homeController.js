const ejs = require('ejs');
const fetch =require('node-fetch')
const nodemailer= require('nodemailer')
const root = function(req, res) {
    return res.render('home', {title: "Twitter"});
}

const vaccineTracker=async function(req,res){
    console.log(req.query.pincode);
    
    const header = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    };
    const response= await fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+req.query.pincode+"&date=27-08-2021",{
        
        headers: header,
    });
    
    const data=await (response.json());
    // console.log(data);
    var s="";
    data.sessions.forEach(element => {
        // console.log(element.name,element.vaccine);
    });
    
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'unacademyams@gmail.com',
          pass: '123456789AMs'
        }
      });
      
      var mailOptions = {
        from: 'unacademyams@gmail.com',
        to: req.query.email.toString(),
        subject: 'Vaccination Slot Details',
        text: s,
      };
      
      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //     return res.redirect('back');
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //     return res.redirect('back');
      //   }
      // });
      return res.redirect('back');
    
}
module.exports={
    root,
    vaccineTracker
}