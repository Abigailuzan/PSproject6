const mysql = require('mysql2');


const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'au270101',
    database:'fullstack6-db',
    port:'3306'
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL successfully.');
});

console.log(connection.database)
