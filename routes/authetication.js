const { Db } = require('../model/Db')
const { newUser } = require('../model/newUser')
const { User } = require('../model/User')
const { Mailer } = require('../model/Mailer')
const { Auth } = require('../model/Auth')
const env = require('dotenv').config()

let autheticate = (app) => {
    app.post('/login', (req, res) => {

        let auth = new Auth(req.body.username, req.body.password)
        let token = auth.signtoken()
        
        auth.autheticate().then((successorFailure)=>{
            if(successorFailure){
                var responseobj = 
                {
                    'success' : successorFailure,
                    'token' : token
                }
            }else{
                var responseobj = 
                {
                    'success' : successorFailure,
                    'message' : 'Log in creditals incorrect'
                }
            }
            res.json(responseobj)
        })
    });
    
    app.post('/register', (req, res) => {
            //add new user in newuser table
            let mailer = new Mailer
            let user = new User
            let newuser = new newUser(req.body.username, req.body.password, req.body.email)
            
            if(req.body.username && req.body.password && req.body.email){
                user.findUserByUsername(req.body.username).then((user)=>{
                    if(user.length > 0){
                        res.json({'error' : 'Username already exists'})
                    }else{
                        newuser.createNewUser().then((result)=>{
                            let { insertId } = result
                            mailer.register_mail(req.body.username, req.body.email, 'bernard.pub125147@gmail.com', insertId)
                        })
                        res.json({
                            'success' : true,
                            'message' : `Please check your email ${req.body.email} for confirmation email`
                        })
                    }
                })


            }else{
                res.json({
                    'error' : 'Please enter Username, Password and Email'
                })
            }
           
    });

    app.get('/confirmUser/:id',(req, res)=>{
        let dbh = new Db

        dbh.findByID('newuser',req.params.id).then((newuser)=>{
            var newuser = newuser[0]
            var { username, password, email } = newuser
            let user = new User(username, password, email)
            user.createUser()
        })
        res.send('Please log in to your new account with your new creditials')
    })
}

module.exports = autheticate;

