import express from 'express';
import * as likeController from './like.controller.js';
import { TimesLimiter } from '../app/app.middleware.js'


const router = express.Router({
    prefixKey: "/like"
});

/**
 * 获取当前用户对当前文章/说说/留言 是否点赞
 */
router.post('/api/like/getIsLikeByIdAndType', likeController.getLikeStatus);

/**
 * 点赞
 */
router.post('/api/like/addLike', TimesLimiter({
    prefixKey: "like/addLike",
    message: "小伙子你在刷赞，被我发现了！",
    limit: 10,
}), likeController.addLike);

/**
 * 取消点赞
 */ 
router.post('/api/like/cancelLike', TimesLimiter({
    prefixKey: "like/cancelLike",
    message: "小伙子你在刷取消赞，被我发现了！",
    limit: 10,
}), likeController.cancelLike);


/**
 * 导出路由
 */
export default router;