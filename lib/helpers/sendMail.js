import nodemailer from "nodemailer";

const sendMail = async (to, token) => {
  try {
    let message = `
    <h1>Verify your email by clicking the link below:</h1>
    <hr/>
    <a href=${process.env.URL}/verify-email/${token}>Verify Email</a>
    <br/>
    <small>This is a auto-generated email, please don't reply to this email.</small>
    `;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: "baniya.sabinn@outlook.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: "baniya.sabinn@outlook.com",
      to,
      subject: "User Account Verification for Chat App",
      html: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendMail;
