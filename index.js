var express = require('express')
var bodyParser = require('body-parser')
var app = express()

const autheticate = require('./routes/authetication')
const userRoutes = require('./routes/userRoutes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

autheticate(app)
userRoutes(app)

app.listen(8080)

module.exports = {
    'app' : app
}
// console.log(lol)
// var token = jwt.sign({ foo: 'bar' }, 'code');
// var decoded = jwt.verify(token, 'shhhhh');
// console.log(decoded)
// console.log(token)