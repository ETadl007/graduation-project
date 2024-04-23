import express from 'express';
import * as articleController from './article.controller';

const router = express.Router();

/**
 * 获取文章列表
 */
router.get('/articleList', articleController.getArticleList);

/**
 * 导出路由
 */
export default router;