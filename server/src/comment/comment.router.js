import express from 'express';
import * as commentController from './comment.controller.js';
import { filterSensitiveMiddleware } from './comment.middleware.js';

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
 * 添加评论
 */

router.post('/api/comment/add', commentController.addComment);

/**
 * 添加回复评论
 */

router.post('/api/comment/apply', filterSensitiveMiddleware, commentController.addReplyComment);


/**
 * 点赞评论
 */
router.put('/api/comment/thumbUp/:id', commentController.likeComment)

/**
 * 取消点赞评论
 */
router.put('/api/comment/cancelThumbUp/:id', commentController.cancelLikeComment)

/**
 * 导出路由
 */
export default router;