const { Router } = require('express')

const authHandler = require('../middleware/authHandler')
const connection = require('../config/dbconnection')

const taskRoutes = Router();

//Express Apllication Routes
taskRoutes.get('/', authHandler, (req, res) => {
    connection.query(`select * from tasks`, (err, tasks) => {
        if (err) {

        } else {
            console.log(tasks)
            res.render('tasks', { tasks })
        }
    })
})

taskRoutes.get(`/add`, authHandler, (req, res) => {
    res.render(`add_task`)
})

taskRoutes.post(`/add`, authHandler, (req, res) => {
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


taskRoutes.get('/view-task/:id', authHandler, (req, res) => {
    const id = req.params.id
    connection.query(`select * from tasks where id = ${id}`, (err, tasks) => {
        if (err) {
            res.json({ message: "Task is not found" });

        } else {
            res.render('view_task', { task: tasks[0] })
        }
    })
})

taskRoutes.get('/edit/:id', authHandler, (req, res) => {
    const id = req.params.id
    connection.query(`select * from tasks where id = ${id}`, (err, tasks) => {
        if (err) {
            res.json({ message: "Task is not found" });
        } else {
            res.render('edit_task', { task: tasks[0] });
        }
    })
})

taskRoutes.post('/edit/:id', authHandler, (req, res) => {
    const id = req.params.id
    const { title, decription, deadline, status } = req.body;
    connection.query(`update tasks set title = '${title}',decription='${decription}', deadline = '${deadline}', status='${status}' where id = ${id}`, (err) => {
        if (err) {
            res.json({ message: 'Error updating data!', err })
        } else {
            res.redirect('/')
        }
    })
})


// taskRoutes.post(`//add`, (req, res) => {
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

taskRoutes.get('/delete-task/:id', authHandler, (req, res) => {
    const id = req.params.id
    connection.query(`delete from tasks where id = ${id}`, (err) => {
        if (err) {
            res.json({
                message: 'Task not found', err
            })
        } else {
            res.redirect('/')
        }
    })
})

module.exports = taskRoutes