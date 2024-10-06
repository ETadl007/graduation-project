import express from 'express';
import * as talkController from './talk.controller.js';
import * as likeControllerfrom from '../like/like.controller.js';
import { TimesLimiter } from '../app/app.middleware.js'

const router = express.Router({
    prefixKey: '/talk'
});

/**
 * 获取说说列表
 */
router.post('/api/talk/blogGetTalkList', talkController.getTalkList);

/**
 * 说说点赞
 */
router.post('/api/like/addLike', TimesLimiter({
    prefixKey: "talk/like/addLike",
    message: "小伙子你在刷赞，被我发现了！",
    limit: 10,
}), likeControllerfrom.addLike);

/**
 * 取消说说点赞
 */
router.post('/api/like/cancelLike',TimesLimiter({
    prefixKey: "talk/like/cancelLike",
    message: "小伙子你在刷取消赞，被我发现了！",
    limit: 10,
}), likeControllerfrom.cancelLike);


/**
 * 导出路由
 */
export default router;