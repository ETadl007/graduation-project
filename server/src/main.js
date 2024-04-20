const express = require('express');
const path = require("path")
const app = express();
const cors = require('cors');


const corsConfig = { 
    origin: "http://localhost:8080",
    credentials: true,
}
// 设置跨域访问
app.use(cors(corsConfig))

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")))

// 设置路由
app.use("/api/article", require("./router/article"));


module.exports = app