
const { Db } = require('./Db'); 
const jwt = require('jsonwebtoken');
class Auth {
    constructor(username, password) {
      this.username = username;
      this.password = password;
      this.db = new Db
    }

    signtoken() {
        var creditials = {
            'username' : this.username,
            'password' : this.password,
        }
        var token = jwt.sign(creditials, 'lhicreoiiiewiohfewioho');
        return token
    }

    autheticate(){
        return new Promise((resolve)=>{
            this.db.exec(`select * from user where username='${this.username}' and password='${this.password}'`)
                .then((message)=>{
                try{
                    if(message[0].username && message[0].password){
                        resolve(true)
                    }
                }catch{
                    resolve(false)
                }
            })
        })
    }
}

module.exports = Auth;

