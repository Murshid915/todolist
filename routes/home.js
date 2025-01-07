const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const authHandler = require('../middleware/authHandler')
const connection = require('../config/dbconnection')
const {SECRET_KEY} = require('../constants/secret')

const routes = Router()

routes.get('/', (req, res) => {
    res.render('index')
})  ''

routes.get('/signup', (req, res) => {
    res.render('signup')
})

routes.post('/signup', (req, res) => {
    const { fname, email, password } = req.body
    const hashpassword = bcrypt.hashSync(password, 10)
    // Password length check    
    if (password.length < 6) {
        return res.render('signup', { message: 'Password length must be 6 or above' })
    }
    //Email format check
    if (!email.match(/[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[a-zA-Z]+/gm)) {
        return res.render('signup', { message: 'Incorrect email format!' })
    }

    connection.query(`select * from users where email = '${email}'`, (err, result) => {
        if (err) {
            res.render('signup', { message: 'Signup failed!' })
        } else {
            // Email already exist check
            if (result.length > 0) {
                return res.render('signup', { message: 'User is already exist with this email' })
            }
        }
    })
    connection.query(`insert into userst (full_name,email,password) values ('${fname}','${email}','${hashpassword}')`, (err) => {
        if (err) {
            res.render('signup', { message: 'Signup failed!' })
        } else {
            res.redirect('/login');
        }
    })
})

routes.get('/login', (req, res) => {
    res.render('login');
})

routes.post('/login', (req, res) => {
    const { email, password } = req.body
    // password length check
    if (password.length < 6) {
        return res.render('login', { message: 'Password length must be 6 or above' })
    }
    //Email Format check
    if (!email.match(/[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[a-zA-Z]+/gm)) {
        return res.render('login', { message: 'Incorrect email format!' })
    }

    connection.query(`select * from userst where email = '${email}'`, (err, result) => {

        if (err) {
            return res.render('login', { message: 'Login Error...!' })
        } else if (result.length < 1) {
            return res.render('login', { message: 'User doesn\'t exist!' })
        } else if (bcrypt.compareSync(password, result[0]['password'])) {
            const token = jwt.sign({ user_id: result[0].id, full_name: result[0].full_name }, SECRET_KEY, { expiresIn: '1h' })
            res.cookie('myToken', token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
            })
            return res.redirect('/tasks')
        } else {
            return res.render('login', { message: 'Incorrect password!' })
        }
    })
})

routes.use('/tasks/',require('./task'))

module.exports = routes