const mysql = require('mysql');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = require('../config/config');

const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

const seq = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        reject(err);
        return;
      }
      connection.query(sql, params, (queryError, results, fields) => {
        connection.release();
        if (queryError) {
          console.error('Error executing MySQL query: ' + queryError.stack);
          reject(queryError);
          return;
        }
        resolve(results);
      });
    });
  });
};

module.exports = seq;


