import express from 'express';
import * as talkController from './talk.controller.js';
import * as likeControllerfrom from '../like/like.controller.js';

const router = express.Router();

/**
 * 获取说说列表
 */
router.post('/api/talk/blogGetTalkList', talkController.getTalkList);

/**
 * 说说点赞
 */
router.post('/api/like/addLike', likeControllerfrom.addLike);

/**
 * 取消说说点赞
 */
router.post('/api/like/cancelLike', likeControllerfrom.cancelLike);


/**
 * 导出路由
 */
export default router;