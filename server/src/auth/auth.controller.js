import { signToken } from "./auth.service.js";

/**
 * 用户登录
 */

export const login = async (req, res, next) => {

    const { username:{id, username, role} } = req.body;

    const payload = { id, username };
    
    try {

        // 签发令牌
        const token = signToken({ payload });

        res.send({
            status:0,
            message:"用户登录成功",
            data:{
                id,
                username,
                role,
                token
            }
        })
    } catch (err) {
        next(err);
    }

}

/**
 *  验证登录
 */

export const validate = async (req, res, next) => {

    res.send({
        status:0,
        message:"验证成功"
    });

}