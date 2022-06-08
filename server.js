const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRoute = require('./Routes/indexRoute')

app.set('view engine','ejs')
app.set('views',__dirname + "/views")

app.set('layout','layouts/beforeLogin')
app.use(expressLayouts)

app.use(express.static('Static'))

app.use(bodyParser.urlencoded({extended:false}))

app.use('/',indexRoute)

app.listen( process.env.WEB_PORT||4000)