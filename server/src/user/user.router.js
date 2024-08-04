import express from 'express';
import * as userController from './user.controller.js';
import { validateUserData, hashPassword } from './user.midddleware.js';
import { authGuard } from '../auth/auth.middleware.js'

const router = express.Router();


/**
 * 用户注册
 */
router.post('/api/user/register', validateUserData, hashPassword,  userController.store);

/**
 * 获取当前登录用户信息
 */
    
router.get("/api/user/getUserInfoById/:id", userController.getUserInfoById);

/**
 * 更新当前登录用户信息
 */
router.put("/api/user/updateOwnUserInfo/", authGuard, userController.updateOwnUserInfo);


/**
 * 导出路由
 */
export default router;