var express = require('express')
var bodyParser = require('body-parser')
var app = express()
const Auth = require('./model/Auth')
const autheticate = require('./routes/authetication')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

autheticate(app)

app.listen(8080)

module.exports = {
    'app' : app
}
// console.log(lol)
// var token = jwt.sign({ foo: 'bar' }, 'code');
// var decoded = jwt.verify(token, 'shhhhh');
// console.log(decoded)
// console.log(token)