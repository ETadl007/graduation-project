import * as userService from '../user/user.service.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PUBLIC_KEY } from '../app/app.config.js';

/**
 * 验证用户登录数据
 */
export const validateLoginData = async (req, res, next) => {

    // 获取数据
    const { username, password } = req.body;

    // 验证必填数据
    if (!username) return next(new Error('NAME_IS_REQUIRED'))
    if (!password) return next(new Error('PASSWORD_IS_REQUIRED'))

    // 验证用户名是否存在
    const user = await userService.getUserByName(username, { password: true });
    if (!user) return next(new Error('USER_DOES_NOT_EXISTS'))

    // 验证用户密码
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'))

    // 在请求主体里添加用户
    req.body.username = user;

    // 下一步
    next();
}

/**
 * 验证用户身份
 */
export const authGuard = async (req, res, next) => {

    try {
        const authorization = req.header('Authorization');

        // 验证token
        if (!authorization) throw new Error();

        // 提取 JWT 令牌
        const token = authorization.replace('Bearer ', '');

        if (!token) throw new Error();

        // 验证令牌
        jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                return next(new Error('UNAUTHORIZED'))
            }

            // 验证通过
            // 在请求主体里添加用户
            req.username = decoded

            // 下一步
            next();
        });


    } catch (error) {
        console.error("未授权，请先登录:", error);
        if (error.name === "TokenExpiredError") {
            return next(new Error('TokenExpiredError'));
        }
        if (error.name === "JsonWebTokenError") {
            return next(new Error('JsonWebTokenError'));
        }
        return next(new Error('UNAUTHORIZED'));
    }
}