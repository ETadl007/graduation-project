import express from 'express';
import * as linksController from './links.controller.js';

const router = express.Router();

/**
 * 获取友链列表
 */
router.post('/api/links/getLinksList', linksController.getTalkList);

/**
 * 导出路由
 */
export default router;