const express = require('express')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.send('list user')
    })
    .post((req, res) => {
        const newUser = {
            name: req.body.name,
            
        }
    })

module.exports = router
