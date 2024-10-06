import * as likeService from './like.service.js';

/**
 * 获取当前用户对当前文章/说说/留言 是否点赞
 */


export const getLikeStatus = async (req, res, next) => {

    const {user_id, type, for_id } = req.body;

    const params = [user_id, type, for_id]
    
    try {
        
        const likeStatus = await likeService.isLike(params);

        res.send({
            status: 0,
            message: '获取消息列表成功',
            data: likeStatus
        })
        
    } catch (err) {
        next(err);
    }
}

/**
 * 点赞
 */

export const addLike = async (req, res, next) => {

    const { for_id, type, user_id } = req.body;

    const params = [for_id, type, user_id]

    try {
        const result = await likeService.addLike(params);

        res.send({
            status: 0,  
            message: '点赞成功',
            data: result
        })  
    } catch (error) {
        console.log(error);
        next(new Error('LIKEERROR'));
    }
}

/**
 * 取消点赞
 */

export const cancelLike = async (req, res, next) => {

    const { for_id, type, user_id } = req.body;

    const params = [for_id, type, user_id]

    try {
        const result = await likeService.cancelLike(params);

        res.send({
            status: 0,  
            message: '取消点赞成功',
            data: result
        })  
    } catch (error) {
        console.log(error);
        next(new Error('CANCELLIKEERROR'));
    }
}