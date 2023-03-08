const express = require('express')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        sess= req.user
        res.render('index')
    })

module.exports = router
