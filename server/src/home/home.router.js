import express from 'express';
import * as statisticController from './home.controller.js';

const router = express.Router();

/**
 * 获取数据统计
 */
router.get('/api/statistic', statisticController.storeStatistic);

/**
 * 导出路由
 */
export default router;