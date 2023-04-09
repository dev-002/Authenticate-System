const auth = (obj) => {
    return (req, res, next) => {
        if (obj.username == req.body.username && obj.password == req.body.password)
            next()
        else   
            return res.redirect('/login')
    }
}

module.exports = {auth}