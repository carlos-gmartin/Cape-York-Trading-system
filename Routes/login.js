const express = require('express')
// Getting router from express
const router = express.Router();

const bcrypt = require('bcrypt');

const {db} = require('../database');

const{check,validationResult}  = require('express-validator');

router.get('/', ((req, res) => {
    res.render('Login',{layout:false})
}));

router.post('/login', [
    check("email").trim(),
    check("password").trim()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        res.render('Login',{layout:false,alert: alert})
    } else {
        db.all(`Select * from users where Email = ?`,[req.body.email],async (err,results)=>{
            if(err) {
                return console.error(err.message)
            } else {
                if(results.length > 0) {
                    var result = await bcrypt.compare(req.body.password, results[0].Password);
                    if(result) {
                        sess=req.session;
                        sess.email = req.body.email;
                        res.redirect(301, '/dashboard');
                    }
                }
            }
        });
    }
});

module.exports = router;