const mysql = require('promise-mysql');
const env = require('dotenv').config()

class Db{
    exec(query){
        return new Promise((resolve, reject)=>{
            mysql.createConnection({
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBNAME
            }).then((conn)=>{
                    return conn.query(query);
                }
            ).then((value)=>{
                resolve(value)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

    findByField(table, field, value){
        return new Promise((resolve, reject)=>{
            mysql.createConnection({
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBNAME
            }).then((conn)=>{
                var query = `select * from ${table} where ${field}=${value}`
                return conn.query(query);
            })
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

    findByID(table, id){
        return new Promise((resolve, reject)=>{
            mysql.createConnection({
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBNAME
            }).then((conn)=>{
                var query = `select * from ${table} where id=${id}`
                console.log(query)
                return conn.query(query);
            })
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

    insert(table,field, value){
        return new Promise((resolve, reject)=>{
            mysql.createConnection({
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBNAME
            }).then((conn)=>{
                var fields = field.join(',')
                var values = value.map((f)=>{
                    return `'${f}'`
                }).join(',')
                console.log(`
                INSERT INTO ${table} (${fields}) VALUES (${values});`)
                return conn.query(`INSERT INTO ${table} (${fields}) VALUES (${values});`);
            })
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }

    updateByID(id, table, field, value){
        return new Promise((resolve, reject)=>{
            mysql.createConnection({
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBNAME
            }).then((conn)=>{
                let query = `UPDATE ${table} SET ${field}='${value}' where id='${id}'`;
                return conn.query(query);
            })
            .then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }


}

module.exports = {
    'Db' : Db
}

// var db = new Db;
// db.findByID('newuser', '3').then((result)=>{
//     var { username, password, email } = result[0]
// })
// db.insert('user',['username','password','token'],['Fourth User','fjoife','eyccjoprknceelooekop']);
// db.updateByID('2','user','username','somePW');






