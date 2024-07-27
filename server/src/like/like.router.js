import express from 'express';
import * as likeController from './like.controller.js';

const router = express.Router();

/**
 * 获取当前用户对当前文章/说说/留言 是否点赞
 */
router.post('/api/like/getIsLikeByIdAndType', likeController.getLikeStatus);

/**
 * 点赞
 */
router.post('/api/like/addLike', likeController.addLike);

/**
 * 取消点赞
 */
router.post('/api/like/cancelLike', likeController.deleteLike);


/**
 * 导出路由
 */
export default router;