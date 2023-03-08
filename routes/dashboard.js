const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('dashboard', { layout: 'layouts/layout2' })
})


module.exports = router