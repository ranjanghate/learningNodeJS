const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send( {
    to: email,
    from: 'actionmailer32@gmail.com',
    subject: 'Thank you for joining',
    text: `Hi ${name}, Welcome to our task manager app`
  })
}

const sendDeleteEmail = (email, name) => {
  sgMail.send( {
    to: email,
    from: 'actionmailer32@gmail.com',
    subject: 'Sad to here you go!',
    text: `Hi ${name}, Please give us the reason why to delete you account`
  })
}

module.exports = { sendWelcomeEmail, sendDeleteEmail }
