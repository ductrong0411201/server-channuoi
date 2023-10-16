const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  service: "Gmail",
  auth: {
    user: 'nvtuann.server@gmail.com',
    pass: 'ueovogwgbuzfjoae'
  }
});
module.exports = transporter;
