const mysql = require('mysql2');


const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'au270101',
    database:'fullstack6-DB',
    port:'3306'
})

console.log(connection.database)