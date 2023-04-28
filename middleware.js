require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/userSchema');

const auth = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.cookies.token;
    if (token === null) return res.status(401).res.send('Token Not Set');

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).redirect('/form/login');
        req.user = user;
        next();
    });
}

const jwtToken = async (user) => {
    const accessToken = user && jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN);
    user.token = accessToken;
    await user.save();
    return accessToken;
}

const passAuth = async ({ username, password }) => {
    try {
        const user = await User.findOne({ username: username });
        const hashedpassword = user && await bcrypt.compare(password, user.password);
        // user is object of the matched data
        return hashedpassword ? user : null;
        // but since this is a async function it will return a promise
    }
    catch (e) {
        console.log(e.message);
    }
}

const userCreate = async ({ name, username, password }) => {
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        return await User.create({ name, username, password: hashedpassword });
    }
    catch (e) {
        console.log(e.message);
        return null;
    }
};

module.exports = { auth, jwtToken, passAuth ,userCreate};