const express = require('express');

const { jwtToken, passAuth, userCreate } = require('../middleware');

require('dotenv').config();

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('signForm', { userflag: false });
});

router.post('/login', async (req, res) => {
    try {
        const user = await passAuth(req.body);
        if (user !== null) {
            const token = user && await jwtToken(user);

            res.cookie('token', token, {
                maxAge: 10 * 60 * 1000
            });
            res.render('loggedin', { ...req.body, alertflag: false });
        }
        else
            res.render('signForm', { ...req.body, userflag: true });
        // rendering from the post route 
        // forecully requires us to resubmit the form details
    }
    catch (e) {
        console.log(e.message);
    }
});

router.post('/signup', async (req, res) => {

    const user = await userCreate(req.body);

    const token = user && await jwtToken(user);

    res.cookie('token', token, {
        maxAge: 10 * 60 * 1000
    });
    res.render('loggedin', { ...req.body, alertflag: true });
});

module.exports = router;