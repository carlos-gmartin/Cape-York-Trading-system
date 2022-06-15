require("dotenv").config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash  = require('express-flash')

initializePassport(passport)

const dashboardRoute = require('./Routes/dashboard')
const regRoute = require('./Routes/register');
const logRoute = require('./Routes/login');
const inventoryRoute = require('./Routes/inventory');

app.set('view engine','ejs')
app.set('views',__dirname + "/views")

app.set('layout','layouts/template')
app.use(expressLayouts)

app.use(express.static('Static'))

app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', logRoute);
app.use('/dashboard',dashboardRoute)
app.use('/register',regRoute)
app.use('/inventory', inventoryRoute)

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});


app.listen(process.env.WEB_PORT||4000)