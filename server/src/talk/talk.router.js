import express from 'express';
import * as talkController from './talk.controller.js';

const router = express.Router();

/**
 * 获取说说列表
 */
router.post('/api/talk/blogGetTalkList', talkController.getTalkList);

/**
 * 说说点赞
 */
router.put('/api/talk/like/:talkId', talkController.likeTalk);

/**
 * 取消说说点赞
 */
router.put('/api/talk/cancelLike/:talkId', talkController.unlikeTalk);


/**
 * 导出路由
 */
export default router;