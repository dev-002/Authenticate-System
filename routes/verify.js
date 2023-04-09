const express = require('express')

const {auth} = require('../middleware')

// For temporary
const autherized = 
    { username: 'Admin',
        password: 'test123'}

const router = express.Router()

router.post('/', auth(autherized), (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    res.render('loggedin', {username, password})
})

module.exports = router