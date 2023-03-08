const express = require('express')
const { VerifyUserLogin } = require('../controllers/loginHandler')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        res.render('login')
    })
    .post(async (req, res) => {
        const user = await VerifyUserLogin(req.body)
    })

module.exports = router