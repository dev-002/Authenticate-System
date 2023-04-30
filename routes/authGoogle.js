const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/',
    passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/callback', 
    passport.authenticate('google', {failureRedirect: '/form/login'}), (req, res)=>{
        // res.render('loggedin',{username: 'Google',alertFlag: false});
        // res.send(req.user);
        res.render('GoogleLog',({GoogleUser:{...req.user}}));
    });

router.get('/logout',(req, res)=>{
    req.logout();
    req.session.destroy(()=>{
        res.clearCookie('connect.sid');
        res.redirect('/form/login');
    });
});

module.exports = router;