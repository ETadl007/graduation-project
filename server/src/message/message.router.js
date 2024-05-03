import express from 'express';
import * as messageController from './message.controller.js';

const router = express.Router();

/**
 * 获取留言列表
 */
router.post('/api/message/getMessageList', messageController.getMessage);

/**
 * 获取热门标签
 */
router.get('/api/message/getHotTagList', messageController.getMessageHotTags);

/**
 * 导出路由
 */
export default router;