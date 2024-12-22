var express = require("express");
var app = express();
var nodemailer = require('nodemailer');
var otp = require("./otp.js");
var cors = require("cors");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'konda.mahesh1280@gmail.com',
        pass: 'qlro dtmq bhcx mjhq'
    }
});


app.post("/otp", (req, res) => {
    
    let {email} = req.body;

    var mailOptions = {
        from: 'konda.mahesh1280@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: `Your one time password is ${otp()}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send(error.message);
        } 
        else {
            let match = mailOptions.text.match(/(\d+)/);
            let otpToSend = match[0];
            res.send({
                status:200,
                message:"Successfully sent"
            });
        }
    });
})

var port = 3006;

app.listen(port, () => {
    console.log("server started"+port);
})

