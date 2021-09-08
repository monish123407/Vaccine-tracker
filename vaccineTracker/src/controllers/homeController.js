const ejs = require('ejs');
const fetch =require('node-fetch')
const nodemailer= require('nodemailer')
const root = function(req, res) {
    return res.render('home', {title: "Twitter"});
}

const vaccineTracker=async function(req,res){
    // console.log(req.query.pincode);
    const newdate=req.query.date.split("-").reverse().join("-");
    
    const header = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    };
    const response= await fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+req.query.pincode+"&date="+newdate,{
        
        headers: header,
    });
    
    const data=await (response.json());
    console.log(data);
    var s="";
    s+= "Fee Type" + "             "+"Vaccine available for dose1"+"            "+"Vaccine available for dose 2"+"           "+"Centre Name "+"            "+"Vaccine name";
    s+="\n";
    data.sessions.forEach(element => {
        // console.log(element.name,element.vaccine);
        s+=element.fee_type+"                    "+element.available_capacity_dose1+"                 "+element.available_capacity_dose2+"                  "+element.name.toString()+"                 "+element.vaccine;
        s+="\n";
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
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.redirect('back');
        } else {
          console.log('Email sent: ' + info.response);
          return res.redirect('back');
        }
      });
      return res.redirect('back');
    
}
module.exports={
    root,
    vaccineTracker
}