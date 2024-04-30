import express from 'express';
import * as articleController from './article.controller.js';

const router = express.Router();

/**
 * 获取文章列表
 */
router.get('/api/article/blogHomeGetArticleList/:current/:size', articleController.getArticleList);

/**
 * 获取前台时间轴列表
 */
router.get('/api/article/blogTimelineGetArticleList/:current/:size', articleController.getArticleTimeLineList);

/**
 * 根据文章id获取文章详情
 */
router.get('/api/article/getArticleById/:id', articleController.getArticleDetail);

/**
 * 根据文章id获取推荐文章
 */

router.get('/api/article/getRecommendArticleById/:id', articleController.getArticleRecommend);


/**
 * 导出路由
 */
export default router;