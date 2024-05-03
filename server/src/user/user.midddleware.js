import express from 'express';
import bcrypt from 'bcryptjs';
import * as userService from './user.service.js';

/**
 * 验证用户数据
 */
export const validateUserData = async (req, res, next) => {
    const { username, password } = req.body;

    // 验证必填数据
    if (!username) return next(new Error('NAME_IS_REQUIRED'))
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED'))

    try {
        // 验证用户名是否存在
        const user = await userService.getUserByName(username);
        if (user) return next(new Error('USER_ALREADY_EXISTS'))
        
    } catch (error) {
        next(error)
    }

    // 下一步
    next();
}

/**
 *  HASH 密码
 */
export const hashPassword = async (req, res, next) => {
    const { password } = req.body;

    // HASH 密码
    req.body.password = await bcrypt.hash(password, 10);

    next();
}