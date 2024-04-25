import express from 'express';
import cors from 'cors'; 
import articleRouter from '../article/article.router.js';
import { defaultErrorHandler } from './app.middleware.js';

/**
 *  创建应用
 */

const app = express();

/**
 *  跨域设置
 */

app.use(cors({
  origin: ['http://localhost:8080','http://localhost:8081'],//可设置多个跨域
  credentials: true//允许客户端携带验证信息
}))


/**
 *  处理JSON数据
 */

app.use(express.json());


/**
 *  处理路由
 */
app.use("/", (req, res) =>{
  res.send("hello world");
});
app.use("/api/article", articleRouter);


/**
 *  默认异常处理
 */

app.use(defaultErrorHandler);

/**
 *  导出应用
 */

export default app;
