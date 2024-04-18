const express = require('express');
const path = require("path")
const app = express();

//开放跨域请求
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")))

// 设置路由
app.use("/api/article", require("./router/article"));


module.exports = app