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
    check("ItemName").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Item Name"),
    check("ItemPrice").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Item Price"),
    check("ItemDescription").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Item Description"),
    check("VendorName").isAlpha('en-GB', {ignore: '\s'}).trim().withMessage("Invalid Vendor Name"),
], (req, res) => {
    const error = validationResult(req);
    let alert = error.array();
    if (!error.isEmpty()) {
        console.log(alert);
    } else {
        console.log(req.body);
        db.all('SELECT * FROM users WHERE Email = ?', [req.user.Email],(err, results) => {
            console.log(results);
            db.run('INSERT into items VALUES(?,?,?,?,?,?,?)', [,results[0].Community, req.body.ItemName, req.body.ItemPrice, req.body.ItemDescription, req.body.VendorName, req.body.contact_method]);
            res.render('inventory');
        })
    }
})

module.exports = router