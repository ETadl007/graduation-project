import express from 'express';
import * as notifyController from './notify.controller.js';

const router = express.Router({
    prefixKey: '/notify'
});

/**
 * 分页获取消息列表
 */
router.post('/api/notify/getNotifyList', notifyController.getNotifyList);

/**
 * 阅读消息列表
 */

router.put('/api/notify/update/:id', notifyController.readNotifyList);

/**
 * 删除消息列表
 */

router.delete('/api/notify/delete/:id', notifyController.deleteNotifyList);

/**
 * 导出路由
 */
export default router;