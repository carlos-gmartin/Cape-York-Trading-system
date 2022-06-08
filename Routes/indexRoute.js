const express = require('express')
// Getting router from express
const router = express.Router()

// this is going to be the very first page displayed when the user access website
router.get('/', ((req, res) => {
    res.render('index')
}))

module.exports = router