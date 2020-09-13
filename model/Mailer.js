const env = require('dotenv').config()

class Mailer{
    constructor(){
        this.mailgun = require('mailgun-js')({apiKey: process.env.MAILGUNAPIKEY, domain: process.env.MAILGUNDOMAIN});
    }

    register_mail(user, to, from, newuserid){
        var content = 
        `
        <div>Hi ${user},</div>
        <div>please activiate your account <a href='http://localhost:8080/confirmUser/${newuserid}'>here</a></div>
        `
        var subject = 'Register with Us'
        this.sendmail(to, from, subject, content)
    }
    sendmail(toaddress, fromaddress, subject, content){
        var data = {
        from: toaddress,
        to: fromaddress,
        subject: subject,
        html: content
        };
        var mailgun = this.mailgun;
        mailgun.messages().send(data, (error, body)=> {
            console.log(body)
        });
    }
}

module.exports = {
    'Mailer' : Mailer
}



