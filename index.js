const express = require('express')
const path = require(`path`);
var cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000


//Express Application Settings
app.set('view engine', `ejs`)
app.set(`views`, path.join(__dirname, `views`))

//Express Application Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()) //To handle json data request from the client
app.use(express.urlencoded({ extended: true })) // To handle urlencoded data in a request from the clients
app.use(cookieParser())

app.use('/', require('./routes/home'))

app.use((err, req, res, next) => {
    res.statusCode = 500
    res.json({
        message: err
    })
});

// Setting 404 Not Found  Response Page
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})