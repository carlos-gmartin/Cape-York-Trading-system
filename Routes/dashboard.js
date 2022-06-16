const express = require('express')
// Getting router from express
const router = express.Router()
const {db} = require('../database')

router.get('/',checkNotAuthenticated,(req,res)=>{
    sess = req.session;
    console.log(sess.email);
    res.render('Dashboard')
})

router.post('/getItems',checkNotAuthenticated,(req, res) => {
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

router.get('/getCommunities',checkNotAuthenticated, (req, res) => {
    db.all('SELECT Name FROM communities', (err, results) => {
        var nameArray = [];
        for(var i = 0; i < results.length; i++) {
            nameArray.push(results[i].Name);
        }
        res.send(nameArray);
    });
});

router.post('/getTransactions',checkNotAuthenticated,(req,res) => {
    db.all('SELECT * FROM transactions WHERE Community = ?', [req.body.Community], (err, results) => {
        var TransactionArray = [];
        for(var i = 0; i < results.length; i++) {
            var Transaction = [];
            Transaction.push(results[i].ItemName);
            Transaction.push(results[i].ItemCost);
            Transaction.push(results[i].ItemDescription);
            Transaction.push(results[i].VendorName);
            Transaction.push(results[i].Contact);
            Transaction.push(results[i].Buyer);
            TransactionArray.push(Transaction);
        }
        res.send(TransactionArray);
    })
})

router.post('/buyItem',checkNotAuthenticated,(req, res) => {
    db.all('SELECT * FROM users WHERE Email = ?', [req.user.Email],(err, results) => {
        db.run('INSERT into transactions VALUES(?,?,?,?,?,?,?,?)',[,results[0].FirstName, req.body.Community, req.body.Name, req.body.ItemCost, req.body.ItemDescription, req.body.VendorName, req.body.Contact], (err) => {
            if(err) {
                return console.error(err.message);
            }
        });
        db.run('DELETE FROM items WHERE ItemName = ?',[req.body.Name]);
    });
})

//if user isn't logged in redirect them to login page
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router