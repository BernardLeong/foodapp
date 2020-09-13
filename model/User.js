const { Db } = require('./Db');
class User{
    constructor(username, password, email){
        this.table = 'user'
        this.field = ['username','password','email']
        this.value = [username, password, email]
    }

    createUser(){
        var dbh = new Db;
        return dbh.insert(this.table, this.field, this.value)
    }

    findUserByUsername(username){
        var dbh = new Db;
        var query = `select username from user where username='${username}'`
        console.log(query)
        return dbh.exec(query)
    }
// ...
    // changePassword(){
        
    // }
}

module.exports = {
    'User' : User
}