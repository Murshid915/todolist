const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require("../constants/secret")

const authHandler = (req, res, next) => {
    if ('myToken' in req.cookies) {
        const token = req.cookies.myToken
        try {
            jwt.verify(token, SECRET_KEY)
            next()

        } catch (e) {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}

module.exports = authHandler