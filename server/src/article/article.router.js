import express from 'express';
import * as articleController from './article.controller.js';

const router = express.Router();

/**
 * 获取文章列表
 */
router.get('/blogHomeGetArticleList/:current/:size', articleController.getArticleList);

/**
 * 获取前台时间轴列表
 */
router.get('/blogTimelineGetArticleList/:current/:size', articleController.getArticleTimeLineList);

/**
 * 导出路由
 */
export default router;