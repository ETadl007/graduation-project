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