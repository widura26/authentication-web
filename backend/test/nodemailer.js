import nodemailer from 'nodemailer';
// nodemailer
let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.PASSWORD // generated ethereal password
    }
});

let mailOptions = {
    from: 'widuratreasure26@gmail.com', // sender address
    to: 'widurategalrejo@gmail.com',
    subject: 'Subject of the email',
    text: 'This is the plain text body of the email'
}

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
})

// sendEmail = async (req, res) => {
//     nodemailer.createTestAccount((err, account) => {
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: account.user,
//                 pass: account.pass
//             }
//         })

//         let message = {
//             from: '"Fred Foo 👻" <foo@example.com>', // sender address
//             to: "bar@example.com, baz@example.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//         }

//         transporter.sendMail(message).then(info => {
//             return res.status(201).json({
//                 msg: "you should receive an email",
//                 info: info.messageId,
//                 preview: nodemailer.getTestMessageUrl(info)
//             })
//         });
//     })
// }