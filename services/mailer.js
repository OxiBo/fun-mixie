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
