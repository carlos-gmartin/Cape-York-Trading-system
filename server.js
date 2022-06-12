require("dotenv").config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const dashboardRoute = require('./Routes/dashboard')
const regRoute = require('./Routes/register');
const logRoute = require('./Routes/login');
const session = require('express-session');

app.set('view engine','ejs')
app.set('views',__dirname + "/views")

app.set('layout','layouts/template')
app.use(expressLayouts)

app.use(express.static('Static'))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended:false}))

app.use('/dashboard',dashboardRoute)
app.use('/register',regRoute)
app.use('/', logRoute);



app.listen( process.env.WEB_PORT||4000)