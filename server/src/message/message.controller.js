import * as messageService from './message.service.js';
import { PAGE_SIZE } from '../app/app.config.js';

/**
 * 获取说说列表
 */

export const getMessage = async (req, res, next) => {
    // 当前页码
    let { current = 1, size, type } = req.body;

    // 每页内容数量
    const limit = parseInt(PAGE_SIZE, 10) || 6;

    // 偏移量
    const offset = (current - 1) * limit;

    const params = [limit, offset]

    try {
        const message = await messageService.getMessageList(params);
        const total = await messageService.getMessageTotal();
        res.send({
            status: 0,
            message: '获取留言列表成功',
            data: {
                current,
                size,
                list: message,
                total
            }
        });
    } catch (err) {
        next(err)
    }
}

/**
 * 获取热门标签
 */
export const getMessageHotTags = async (req, res, next) => {
    try {
        const messageHotTags = await messageService.getMessageHotTags();
        res.send({
            status: 0,
            message: '获取热门标签成功',
            data: messageHotTags
        });
    } catch (err) {
        next(err)
    }
}