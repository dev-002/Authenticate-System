const express = require('express');
const {auth} = require('../middleware');

const router = express.Router();

router.get('/s-:Message',auth, (req, res) => {
    const {Message} = req.params;
    res.render('secretMessage', {Message});
});

module.exports = router;