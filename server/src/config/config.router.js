import express from 'express';
import * as configController from './config.controller.js';

const router = express.Router({
    prefixKey: '/config'
});

/**
 * 获取网站配置
 */
router.get('/api/config', configController.storeWebConfig);

/**
 * 导出路由
 */
export default router;