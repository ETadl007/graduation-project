import express from 'express';
import * as commentController from './comment.controller.js';

const router = express.Router();

/**
 * 获取网站配置
 */
router.post('/api/comment/getCommentTotal', commentController.getCommentTotal);

/**
 * 导出路由
 */
export default router;