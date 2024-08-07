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
import messageRouter from '../message/message.router.js';
import userRouter from '../user/user.router.js';
import authRouter from '../auth/auth.router.js';
import notifyRouter from '../notify/notify.router.js';
import likeRouter from '../like/like.router.js';
import uploadRouter from '../utils/uploads/uploads.router.js';
import rateLimit from 'express-rate-limit'
/**
 *  创建应用
 */

const app = express();

/**
 * 限制请求频率
 */

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 200, 
  prefixKey: "",
  message: "小黑子，你在刷接口！！",
  messagekey: "message"
});

// 信任代理
app.set('trust proxy', 1)

// 适用于所有路由
app.use(limiter);

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

app.use(articleRouter,
  configRouter, tagRouter,
  homeStatistic, commentRouter,
  categoryRouter, photosRouter,
  talkRouter, linksRouter,
  messageRouter, userRouter,
  authRouter, notifyRouter, likeRouter, uploadRouter);


/**
 *  默认异常处理
 */

app.use(defaultErrorHandler);

/**
 *  导出应用
 */

export default app;
