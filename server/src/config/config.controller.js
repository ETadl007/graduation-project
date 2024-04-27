import * as configService from './config.service.js';

/**
 * 获取网站配置
 */
export const storeWebConfig = async (req, res, next) => {
    try {
        const config = await configService.getWebConfig();
        res.send({
            status: 0,
            msg: '获取网站配置成功',
            data: config
        });
    }catch (error) {
        next(error);
    }
}