const send = require('gmail-send')({
    user: 'ThisIsMyAccount',
    pass: 'ThisIsMyPassword',
    subject: 'Successful registration',
});

class Mailer {

    sendMail(to, callback) {
        send({
            text: 'Welcome to the Chatapp',
            to: to
        }, callback)
    }
}

module.exports = Mailer;