const express = require('express')

const router = express.Router()

router.post('/', (req, res)=>{
    res.send( `${req.body.username}, ${req.body.password}`)
})

module.exports = router