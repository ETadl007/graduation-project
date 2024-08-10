import express from 'express';
import * as linksController from './links.controller.js';

const router = express.Router();

/**
 * 获取友链列表
 */
router.post('/api/links/getLinksList', linksController.getTalkList);


/**
 * 新增友链
 */
router.post('/api/links/add', linksController.addOrUpdateLinks);

/**
 * 修改友链
 */
router.post('/api/links/frontUpdate', linksController.addOrUpdateLinks);


/**
 * 导出路由
 */
export default router;