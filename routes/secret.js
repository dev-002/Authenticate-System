const express = require('express');

const router = express.Router();

router.get('/s-:Message', (req, res) => {
    const {Message} = req.params;
    res.render('secretMessage', {Message});
});

module.exports = router;