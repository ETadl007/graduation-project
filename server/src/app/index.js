import express from 'express';
import articleRouter from '../article/article.router';
import { defaultErrorHandler } from './app.middleware';

/**
 *  创建应用
 */

const app = express();

/**
 *  处理JSON数据
 */

app.use(express.json());


/**
 *  处理路由
 */

app.use(articleRouter);


/**
 *  默认异常处理
 */

app.use(defaultErrorHandler);

/**
 *  导出应用
 */

export default app;
