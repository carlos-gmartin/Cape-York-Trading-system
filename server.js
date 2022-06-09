const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const dashboardRoute = require('./Routes/dashboard')
const regRoute = require('./Routes/register');

app.set('view engine','ejs')
app.set('views',__dirname + "/views")

app.set('layout','layouts/template')
app.use(expressLayouts)

app.use(express.static('Static'))

app.use(bodyParser.urlencoded({extended:false}))

app.use('/',dashboardRoute)
app.use('/register',regRoute)

app.listen( process.env.WEB_PORT||4000)