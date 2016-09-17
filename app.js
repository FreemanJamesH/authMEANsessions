let express = require('express')
let app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');


app.get('/', function(req, res){
  res.render('index')
})

app.get('/register', function(req, res){
  res.render('register')
})

app.get('/login', function (req, res) {
  res.render('login')
})

app.get('/dashboard', function (req, res) {
  res.render('dashboard')
})

app.get('/logout', function (req, res) {
  res.redirect('/')
})

app.listen(3000)
