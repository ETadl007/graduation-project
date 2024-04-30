import * as commentService from './comment.service.js';

/**
 * 获取网站配置
 */
export const getCommentTotal = async (req, res, next) => {
    try {
        const commentTotal = await commentService.blogCommentTotalService();
        res.send({
            status: 0,
            msg: '获取评论总数成功',
            data: commentTotal
        });
    }catch (error) {
        next(error);
    }
}