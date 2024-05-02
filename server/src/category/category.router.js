import express from 'express';
import * as CategoryController from './category.controller.js';

const router = express.Router();

/**
 * 获取文章列表
 */
router.get('/api/category/getCategoryDictionary', CategoryController.getCategoryList);

/**
 * 导出路由
 */
export default router;