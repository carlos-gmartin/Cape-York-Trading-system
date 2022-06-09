const express = require('express')
// Getting router from express
const router = express.Router()
const {db} = require('../database')

router.get('/',(req,res)=>{
    res.render('Dashboard')
})


module.exports = router