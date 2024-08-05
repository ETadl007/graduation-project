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

/**
 * 验证密码
 */
export const validatePassword = async (req, res, next) => {
    
    const { password, password1 } = req.body;

    const { id } = req.username

    try {
        // 检查用户是否提供密码
        if (password === ''){
            return next(new Error('PASSWORD_IS_REQUIRED'))
        }

        // 调取用户数据
        const user = await userService.getUserById(id, {password:true});

        // 验证密码是否匹配
        const matched = await bcrypt.compare(password, user.password)

        if (!matched) {
            return next(new Error('PASSWORD_DOES_NOT_MATCH'))
        }

        // 处理用户更新的密码
        if (password || password1) {
            const matched = await bcrypt.compare(password1, user.password)
            if (matched){
                return next(new Error('PASSWORD_IS_THE_SAME'))
            }

            // HASH 更新密码
            req.username.password = await bcrypt.hash(password1, 10);
        }

    } catch (error) {
        return next(error)
    }

    // 下一步
    next();

}