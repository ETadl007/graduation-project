const mysql = require('mysql2/promise'); // 使用 promise 版本的 mysql2

// 导入数据库配置信息
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = require('../config/config');

// 创建连接池
const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: MYSQL_PORT,
  waitForConnections: true, // 是否等待连接可用
  connectionLimit: 10, // 连接限制
  queueLimit: 0 // 无限制等待队列
});

// 执行 SQL 查询的函数
const seq = async (sql, params) => {
  try {
    // 测试连接是否成功
    const connection = await pool.getConnection();
    console.log('MySQL Database Connected!');
    connection.release();
    
    // 执行查询
    const [results, fields] = await pool.query(sql, params);
    return results;
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    throw error;
  }
};

module.exports = seq;
