const express = require('express')
const User = require('../models/userSchema')

// const {auth} = require('../middleware')

const router = express.Router();

async function userCreate({username, password}){
    const user = await User.create({username, password});
    await user.save();
}

router.post('/', (req, res)=>{
    const {username, password} = req.body;
    
    userCreate(req.body);

    res.render('loggedin', {username, password});
})

module.exports = router