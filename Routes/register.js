const express = require('express')
// Getting router from express
const router = express.Router()
const{check,validationResult}  = require('express-validator');
const bcrypt = require('bcrypt')
const {db} = require('../database')

// this is going to be the very first page displayed when the user access website
router.get('/', ((req, res) => {
    res.render('Register',{layout:false})
}))

router.post('/',[
    // validation for form
    check("fName").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid First Name"),
    check("lName").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Last Name"),
    check("email").isEmail().trim().withMessage("Invalid Email"),
    check("password").isStrongPassword().trim().withMessage("Password must be 8 character long, with 1 lowercase,1 uppercase,1 number,1 symbol"),
    check('conPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })],async(req,res)=>{
    const error = validationResult(req);
    let alert = error.array()
    if (!error.isEmpty()){
        res.render('Register',{layout:false,alert: alert})
    }
    else{
        const regHashedPassword = await bcrypt.hash(req.body.password,10);
        console.log(regHashedPassword)
        //db.all only for select queries for anything else use db.run
        db.all(`Select * from users where Email = ?`,[req.body.email],(err,results)=>{
        if(err) {return console.error(err.message)}
        if(results.length > 0){
            let databaseValid = []
                databaseValid.push({message:"Email already exists"})
                res.render('Register',{layout:false,alert:databaseValid})
        }else{
            db.run(`Insert into users Values(?,?,?,?,?)`,
            [Date.now(),req.body.fName,req.body.lName,req.body.email,regHashedPassword],
            (err,results)=>{
                if(err) {return console.error(err.message)}
                console.log('Data has been inserted ')
            })
        }
    })
    }
  
    

})

module.exports = router