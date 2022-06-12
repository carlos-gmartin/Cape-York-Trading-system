const express = require('express')
// Getting router from express
const router = express.Router()
const {db} = require('../database')

router.get('/',(req,res)=>{
    sess = req.session;
    console.log(sess.email);
    res.render('Dashboard')
})

router.post('/getItems', (req, res) => {
    db.all('SELECT * FROM items WHERE Community = ?',[req.body.Community], (err, results) => {
        var ItemArray = [];
        for(var i = 0; i < results.length; i++) {
            var Item = [];
            Item.push(results[i].ItemName);
            Item.push(results[i].ItemCost);
            Item.push(results[i].ItemDescription);
            Item.push(results[i].VendorName);
            Item.push(results[i].Contact);
            ItemArray.push(Item);
        }
        res.send(ItemArray);
    });
});

router.get('/getCommunities', (req, res) => {
    db.all('SELECT Name FROM communities', (err, results) => {
        var nameArray = [];
        for(var i = 0; i < results.length; i++) {
            nameArray.push(results[i].Name);
        }
        res.send(nameArray);
    });
});


module.exports = router