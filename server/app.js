const app = require('./src/main')
const config = require('./src/config/config')
const { seq } = require('./src/db/index')
const POST = config.APP_PORT || 8080

app.listen(POST, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on http://localhost:${POST}`);
    }
})

// 检查数据库是否连接
const connectAndTestDatabase = async () => {
    try {
        await seq("SELECT 1+1 AS result")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectAndTestDatabase()
