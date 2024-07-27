import dotenv from "dotenv";

dotenv.config();

/**
 * 输出请求地址
 */
export const requestUrl = (req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
};

/**
 *  默认异常处理
 */
export const defaultErrorHandler = (err, req, res, next) => {
    let statusCode;
    let message;

    switch (err.message) {
        case 'NAME_IS_REQUIRED':
            statusCode = 409;
            message = '请提供用户名';
            break;
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 409;
            message = '请提供密码';
            break;

        case 'USER_ALREADY_EXISTS':
            statusCode = 409;
            message = '用户名已存在';
            break;
        case 'USER_DOES_NOT_EXISTS':
            statusCode = 400;
            message = '用户不存在';
            break;
        case 'PASSWORD_DOES_NOT_MATCH':
            statusCode = 400;
            message = '密码错误';
            break;
        case 'UNAUTHORIZED':
            statusCode = 401;
            message = '未授权';
            break;
        case 'ADDCOMMENTERROR':
            statusCode = 400;
            message = '添加评论失败';
            break;
        case 'LIKEERROR':
            statusCode = 400;
            message = '点赞失败';
            break;
        case 'CANCELLIKEERROR':
            statusCode = 400;
            message = '取消点赞失败';
            break;
        default:
            statusCode = 500;
            message = '服务暂时出了点问题  ~~';
            break;
    }

    // 发送错误响应
    res.status(statusCode).json({
        error: message
    });
};
