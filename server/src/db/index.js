const mysql = require('mysql');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = require('../config/config');

module.exports = { 
  config: {
    host: MYSQL_HOST || '127.0.0.1',
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    dataBase: MYSQL_DATABASE
  },
  connect(sql, params, cb) {
    let conn = mysql.creatConnection(this.config)
    conn.connect()
    conn.query(sql, params, cb)
    conn.end()
  }
}


