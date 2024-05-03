import * as userService from './user.service.js';

/**
 * 用户注册
 */

export const store = async (req, res, next) => {
    const { username, password, role } = req.body;

    const params = [username, password, role]
    try {
        const user = await userService.createUser(params);
        res.send({
            status: 0,
            message: '注册成功',
            data: user
        });
    }catch (error) {
        next(error);
    }
}

/**
 * 获取用户信息
 */

export const getUserInfoById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: user
        });
        
    }catch (error) {
        next(error);
    }
}