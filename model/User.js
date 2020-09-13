const { Db } = require('./Db');
class User{
    constructor(username, password, email){
        this.table = 'user'
        this.field = ['username','password','email']
        this.value = [username, password, email]
    }

    createUser(){
        var dbh = new Db;
        dbh.insert(this.table, this.field, this.value)
    }
// ...
    // changePassword(){
        
    // }
}

module.exports = {
    'User' : User
}