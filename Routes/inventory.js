const express = require('express')
// Getting router from express
const router = express.Router()
const session = require('express-session');

const{check,validationResult}  = require('express-validator');

const {db} = require('../database')

// this is going to be the very first page displayed when the user access website
router.get('/', ((req, res) => {
    console.log(req.user.Email)
    res.render('inventory', {useremail: req.user.Email})
}))

router.post('/addItem', [
    check("ItemName").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid First Name"),
    check("ItemPrice").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Last Name"),
    check("ItemDescription").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Last Name"),
    check("VendorName").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Last Name"),
], (req, res) => {
    const error = validationResult(req);
    let alert = error.array();
    if (!error.isEmpty()) {
        console.log(alert);
    } else {
        db.all('SELECT * FROM users WHERE Email = ?', [req.user.Email],(err, results) => {
            console.log(results);
        })
    }
})

module.exports = router