const express = require('express')
// Getting router from express
const router = express.Router()
const session = require('express-session');

const{check,validationResult}  = require('express-validator');

const {db} = require('../database')

// this is going to be the very first page displayed when the user access the website
router.get('/', ((req, res) => {
    console.log(req.user.Email)
    res.render('inventory', {useremail: req.user.Email})
}))

router.post('/addItem', [
    check("ItemName").matches(/^[A-Za-z0-9 .,'!&$£]+$/).trim().withMessage("Invalid Item Name").isLength({min: 0,max:50}) ,
    check("ItemPrice").matches(/^[A-Za-z0-9 .,'!&$£]+$/).trim().withMessage("Invalid Item Price").isLength({min: 0,max:50}),
    check("ItemDescription").matches(/^[A-Za-z0-9 .,'!&$£]+$/).trim().withMessage("Invalid Item Description").isLength({min: 0,max:100}),
    check("VendorName").matches(/^[A-Za-z0-9 .,'!&$£]+$/).trim().withMessage("Invalid Vendor Name").isLength({min: 0,max:50}),
], (req, res) => {
    const error = validationResult(req);
    let alert = error.array();
    if (!error.isEmpty()) {
        console.log("ERROR");
        console.log(alert);
        res.render('Inventory', {alert: alert, useremail: req.body.Email});
    } else {
        console.log(req.body);
        db.all('SELECT * FROM users WHERE Email = ?', [req.user.Email],(err, results) => {
            console.log(results);
            db.run('INSERT into items VALUES(?,?,?,?,?,?,?)', [,results[0].Community, req.body.ItemName, req.body.ItemPrice, req.body.ItemDescription, req.body.VendorName, req.body.contact_method]);
            res.render('Inventory');
        })
    }
})

router.get('/getInventory', (req,res) => {
    db.all('SELECT * FROM users WHERE Email = ?', [req.user.Email],(err, results) => {
        console.log(results);
        db.all('SELECT * FROM items WHERE VendorName = ?', [results[0].FirstName], (err, VendorResults) => {
            console.log(VendorResults);
            var ArrayOfItems = [];
            for(var i = 0; i < VendorResults.length; i++) {
                var SingleItem = [];
                SingleItem.push(VendorResults[i].ItemName);
                SingleItem.push(VendorResults[i].ItemCost);
                SingleItem.push(VendorResults[i].ItemDescription);
                SingleItem.push(VendorResults[i].VendorName);
                SingleItem.push(VendorResults[i].Contact);
                ArrayOfItems.push(SingleItem);
            }
            res.send(ArrayOfItems);
        })
    });
})

router.post('/removeItem', (req, res) => {
    console.log(req.body.Name);
    db.run('DELETE FROM items WHERE ItemName = ?', [req.body.Name]);
})

module.exports = router