import * as linksService from './links.service.js';
import { PAGE_SIZE } from '../app/app.config.js';
import { addNotify } from '../notify/notify.controller.js';

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

/**
 * 新增友链 || 修改友链
 */

export const addOrUpdateLinks = async (req, res, next) => {
    
    try {

        const { id, site_name, site_desc, site_avatar, url, status, user_id } = req.body;

        const data = { id, site_name, site_desc, site_avatar, url, status, user_id };

        const result = await linksService.addOrUpdateLinks(data);

        if (!id) {
            await addNotify({
                user_id: 1,
                type: 4,
                message: `您的收到了来自于：${site_name} 的友链申请，点我去后台审核！`
            })
        }

        const msg = id ? "修改" : "发布";

        res.send({
            status: 0,
            message: `${msg}友链成功`,
            data: result
        });
        
    } catch (error) {
        console.log(error);
        const msg = req.body.id ? "修改" : "发布";
        res.status(500).send({
            error: `${msg}友链失败`, 
            details: error.message
        });
        
    }

}