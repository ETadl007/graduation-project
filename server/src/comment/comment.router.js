import express from 'express';
import * as commentController from './comment.controller.js';

const router = express.Router();

/**
 * 根据文章id获取评论总数
 */
router.post('/api/comment/getCommentTotal', commentController.getCommentTotal);

/**
 * 分页查找父级评论
 */
router.post('/api/comment/frontGetParentComment', commentController.getParentCommentList);

/**
 * 分页查找子评论
 */
router.post('/api/comment/frontGetChildrenComment', commentController.getChildCommentList);

/**
 * 导出路由
 */
export default router;