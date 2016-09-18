const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let User = mongoose.model('User', new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}))

app.set('view engine', 'jade');
app.locals.pretty = true;

mongoose.connect('mongodb://localhost/newauth')

//middleware
app.use(bodyParser.urlencoded({
    extended: true
}))


app.get('/', function(req, res) {
    res.render('index')
})

app.get('/register', function(req, res) {
    res.render('register')
})

app.post('/register', function(req, res) {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function(err) {
        if (err) {
            let error = 'Something bad happened. Try again.';
            if (err.code === 11000){
              error = 'That email is already taken, try another.'
            }
            res.render('register', {error: error})
        } else {
          res.redirect('/dashboard')
        }

    })
})

app.get('/login', function(req, res) {
    res.render('login')
})

app.post('/login', function(req, res){
    User.findOne({email: req.body.email}, function (err, user){
        if (!user){
            res.render('login', {error: 'Invalid email address or password.'})
        } else {
            if (req.body.password === user.password){
                res.redirect('/dashboard')
            } else {
                res.render('login', {error: 'Invalid email address or password.'})
            }
        }
    })
})

app.get('/dashboard', function(req, res) {
    res.render('dashboard')
})

app.get('/logout', function(req, res) {
    res.redirect('/')
})

app.listen(3000)
