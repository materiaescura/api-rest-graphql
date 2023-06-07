require('dotenv').config()
const mysql = require('mysql2/promise')
const {booleanMap} = require('../utils/connection.js')


module.exports = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: booleanMap(process.env.MYSQL_WAIT),
    connectionLimit: parseInt(process.env.MYSQL_CONN_LIMIT),
    queueLimit: parseInt(process.env.MYSQL_QUEUE_LIMIT),
    namedPlaceholders: true
})