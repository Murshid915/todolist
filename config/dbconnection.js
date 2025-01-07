const { createConnection } = require(`mysql`)

const connection = createConnection({
    host: `localhost`,
    user: `root`,
    password: `1234`,
    database: `mydb`
});


module.exports = connection;

// connection.connect((err) => {
//         console.log(`Database not connected ${err}`)
//     } else {
//     if (err) {
//         console.log(`Database connected successfully`)

//     }
// });