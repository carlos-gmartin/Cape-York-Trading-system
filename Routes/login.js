const express = require('express');
// Getting router from express
const router = express.Router();
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('login',{layout:false})
})

router.post('/login',passport.authenticate('local',{

    // what to do after successful login
    successRedirect:'/dashboard',

    // what to do during a failure
    failureRedirect:'/',

    // displays error message on login page
    failureFlash: true

}));

module.exports = router;