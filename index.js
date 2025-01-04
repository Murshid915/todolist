const express = require('express')
const path = require(`path`);
const connection = require('./config/dbconnection');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000

//Express Application Settings
app.set('view engine', `ejs`)
app.set(`views`, path.join(__dirname, `views`))

//Express Application Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()) //To handle json data request from the client
app.use(express.urlencoded({ extended: true })) // To handle urlencoded data in a request from the clients



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', (req, res) => {
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

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {
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
            const token = jwt.sign({ user_id: result[0].id, full_name: result[0].full_name }, '123456abcd', { expiresIn: '1h' })
            
            return res.redirect('/tasks')
        } else {
            return res.render('login', { message: 'Incorrect password!' })
        }
    })
})
//Express Apllication Routes
app.get('/tasks', (req, res) => {
    connection.query(`select * from tasks`, (err, tasks) => {
        if (err) {

        } else {
            console.log(tasks)
            res.render('tasks', { tasks })
        }
    })
})

app.get(`/add-task`, (req, res) => {
    res.render(`add_task`)
})

app.post(`/add-task`, (req, res) => {
    // Store data from the request into Database
    const { title, decription, deadline, status } = req.body;
    connection.query(`insert into tasks (title, decription,status,deadline) values ('${title}', '${decription}', '${status}','${deadline}')`, (err, data) => {
        if (err) {
            console.log(err)
            res.render(`add_task`)
        } else {
            res.render(`add_task`)
        }
    })
})


app.get('/view-task/:id', (req, res) => {
    const id = req.params.id
    connection.query(`select * from tasks where id = ${id}`, (err, tasks) => {
        if (err) {
            res.json({ message: "Task is not found" });

        } else {
            res.render('view_task', { task: tasks[0] })
        }
    })
})

app.get('/edit-task/:id', (req, res) => {
    const id = req.params.id
    connection.query(`select * from tasks where id = ${id}`, (err, tasks) => {
        if (err) {
            res.json({ message: "Task is not found" });
        } else {
            res.render('edit_task', { task: tasks[0] });
        }
    })
})

app.post('/edit-task/:id', (req, res) => {
    const id = req.params.id
    const { title, decription, deadline, status } = req.body;
    connection.query(`update tasks set title = '${title}',decription='${decription}', deadline = '${deadline}', status='${status}' where id = ${id}`, (err) => {
        if (err) {
            res.json({ message: 'Error updating data!', err })
        } else {
            res.redirect('/tasks')
        }
    })
})


// app.post(`/add-task`, (req, res) => {
//     // Store data from the request into Database
//     const { title, decription, deadline, status } = req.body;
//     connection.query(`insert into tasks (title, decription,status,deadline) values ('${title}', '${decription}', '${status}','${deadline}')`, (err, data) => {
//         if (err) {
//             console.log(err)
//             res.render(`add_task`)
//         } else {
//             res.render(`add_task`)
//         }
//     })
// })

app.get('/delete-task/:id', (req, res) => {
    const id = req.params.id
    connection.query(`delete from tasks where id = ${id}`, (err) => {
        if (err) {
            res.json({
                message: 'Task not found', err
            })
        } else {
            res.redirect('/tasks')
        }
    })
})

// Setting 404 Not Found  Response Page
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})