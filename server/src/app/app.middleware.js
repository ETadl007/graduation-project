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
