const app = require('./src/main')
const config = require('./src/config/config')
const POST = config.APP_PORT || 8080

app.listen(POST, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on http://localhost:${POST}`);
    }
})