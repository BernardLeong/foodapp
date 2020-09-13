const { Db } = require('./Db');
class newUser{
    constructor(username, password, email){
        this.table = 'newuser'
        this.field = ['username','password','email']
        this.value = [username, password, email]
    }

    createNewUser(){
        var dbh = new Db;
        dbh.insert(this.table, this.field, this.value)
    }
// ...
    // changePassword(){
        
    // }
}

module.exports = {
    'newUser' : newUser
}