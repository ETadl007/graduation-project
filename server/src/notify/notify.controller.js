import * as notifyService from './notify.service.js';
import { PAGE_SIZE } from '../app/app.config.js';

/**
 * 分页获取消息列表
 */
export const getNotifyList = async (req, res, next) => {

    // 当前页码
    const { current, size, userId } = req.body;

    // 每页内容数量
    const limit = parseInt(PAGE_SIZE, 10) || 10;

    // 偏移量
    const offset = (current - 1) * limit;

    const params = [userId, limit, offset]

    
    try {
        
        const notifyList = await notifyService.getNotifyList(params);

        // 总条数
        const total = await notifyService.getNotifyTotal(userId);

        res.send({
            status: 0,
            message: '获取消息列表成功',
            data: {
                current,
                size,
                list: notifyList,
                total
            }
        })
        
    } catch (err) {
        next(err);
    }
}

/**
 * 阅读消息列表
 */

export const readNotifyList = async (req, res, next) => {
    
    const { userId } = req.params;

    const params = [userId]

    try {
        
        const data = await notifyService.readNotifyList(params);

        res.send({
            status: 0,
            message: '阅读消息列表成功',
            data:data[0]
        })
        
    } catch (err) {
        next(err);
    }
}

/**
 * 删除消息列表
 */

export const deleteNotifyList = async (req, res, next) => {
    
    const { id } = req.params;


    const params = [id]

    try {
        
        const data = await notifyService.deleteNotify(params);
        res.send({
            status: 0,
            message: '删除消息列表成功',
            data:data[0]
        })
    }catch (err) {
        next(err);
    }
}