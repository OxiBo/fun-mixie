// https://charangan.medium.com/send-an-email-using-nodemailer-and-gmail-in-node-js-express-js-34523d5e0aa4

const keys = require("../config/keys"),
  nodemailer = require("nodemailer"),
  smtpTransport = require("nodemailer-smtp-transport");

const mailer = async (mailOptions) => {
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: keys.nodemailerUser,
        pass: keys.nodemailerPass,
      },
    })
  );
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + res.response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = mailer;
