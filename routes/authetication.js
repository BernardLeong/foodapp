const { Db } = require('../model/Db')
const { newUser } = require('../model/newUser')
const { User } = require('../model/User')
const { Mailer } = require('../model/Mailer')
const Auth = require('../model/Auth')
const env = require('dotenv').config()

let autheticate = (app) => {
    app.post('/login', (req, res) => {

        var auth = new Auth(req.body.username, req.body.password)
        var token = auth.signtoken()
        
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
            var mailer = new Mailer;
            var newuser = new newUser(req.body.username, req.body.password, req.body.email)
            
            if(req.body.username && req.body.password && req.body.email){
                newuser.createNewUser().then((result)=>{
                    var { insertId } = result
                    mailer.register_mail(req.body.username, req.body.email, 'bernard.pub125147@gmail.com', insertId)
                })
                res.json({
                    'success' : true,
                    'message' : `Please check your email ${req.body.email} for confirmation email`
                })
            }else{
                res.json({
                    'error' : 'Please entr Username AND Password'
                })
            }
           
    });
    
    app.get('/confirmUser/:id',(req, res)=>{
        //check if req is a valid id
        var dbh = new Db;
        dbh.findByID('newuser',req.params.id).then((user)=>{
            var user = user[0]
            var { username, password, email } = user
            var userObj = new User(username, password, email);
            userObj.createUser()
        })
        //when link is clicked fire off creating a user 
        res.send('Please log in with your new creditials')
    })

    app.post('/testing',(req, res)=>{
        console.log(process.env.TESTING)
        res.json({
            'testing' : process.env.TESTING
        })
    })
}

module.exports = autheticate;

