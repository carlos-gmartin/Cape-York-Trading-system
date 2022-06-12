const express = require('express')
// Getting router from express
const router = express.Router()
const {db} = require('../database')

router.get('/',(req,res)=>{
    sess = req.session;
    console.log(sess.email);
    res.render('Dashboard')
})


module.exports = router