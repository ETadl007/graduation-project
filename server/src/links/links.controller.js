import * as linksService from './links.service.js';
import { PAGE_SIZE } from '../app/app.config.js';

/**
 * 获取友链列表
 */

export const getTalkList = async (req, res, next) => {
    // 当前页码
    let { current = 1, size, status } = req.body;

    // 每页内容数量
    const limit = parseInt(PAGE_SIZE, 10) || 6;

    // 偏移量
    const offset = (current - 1) * limit;

    const params = [status, limit, offset]

    try {
        const talk = await linksService.getLinksList(params);
        const total = await linksService.getLinksCount();
        res.send({
            status: 0,
            message: '获取友链列表成功',
            data: {
                current,
                size,
                list: talk,
                total
            }
        });
    } catch (err) {
        next(err)
    }
}