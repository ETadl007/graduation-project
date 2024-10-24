import express from 'express';
import * as messageController from './message.controller.js';
import * as likeController from '../like/like.controller.js';
import { authGuard } from '../auth/auth.middleware.js'

const router = express.Router({
    prefixKey: '/message'
});

/**
 * 获取留言列表
 */
router.post('/api/message/getMessageList', messageController.getMessage);

/**
 * 获取热门标签
 */
router.get('/api/message/getHotTagList', messageController.getMessageHotTags);

/**
 * 发布留言
 */
router.post('/api/message/add', messageController.addMessage);

/**
 * 点赞留言
 */
router.post('/api/message/like', likeController.addLike);

/**
 * 删除留言
 */
router.put('/api/message/delete', authGuard, messageController.deleteMessage);

/**
 * 修改留言
 */
router.post('/api/message/update', messageController.updateMessage);

/**
 * 导出路由
 */
export default router;