const auth = (obj) => {
    return (req, res, next) => {
        if (obj.username == req.body.username && obj.password == req.body.password)
                next()
        else   
        {
            console.log(obj.username , obj.password)  
            res.send('Not availabe')
        }
    }
}

module.exports = {auth}