import express from 'express';
import cors from 'cors';
import articleRouter from '../article/article.router.js';
import configRouter from '../config/config.router.js';
import tagRouter from '../tag/tag.router.js';
import homeStatistic from '../home/home.router.js'
import { defaultErrorHandler } from './app.middleware.js';
import commentRouter from '../comment/comment.router.js';
import categoryRouter from '../category/category.router.js';
import photosRouter from '../photos/photos.router.js';
import talkRouter from '../talk/talk.router.js';
import linksRouter from '../links/links.router.js';


/**
 *  创建应用
 */

const app = express();

/**
 *  跨域设置
 */

app.use(cors({
  origin: ['http://localhost:8080', 'https://www.xinux.icu'],//可设置多个跨域
  credentials: true//允许客户端携带验证信息
}))


/**
 *  处理JSON数据
 */

app.use(express.json());


/**
 *  处理路由
 */

app.use(articleRouter, configRouter, tagRouter, homeStatistic, commentRouter, categoryRouter, photosRouter, talkRouter, linksRouter);

/**
 *  默认异常处理
 */

app.use(defaultErrorHandler);

/**
 *  导出应用
 */

export default app;
