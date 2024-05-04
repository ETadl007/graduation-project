import * as commentService from './comment.service.js';
import { PARENT_COMMENT_PAGE_SIZE } from '../app/app.config.js';
import { sqlFragment } from './comment.provider.js';

/**
 * 获取评论总数
 * type: 1 文章评论 2 说说评论
 * for_id: 文章id 或者 说说id
 */
export const getCommentTotal = async (req, res, next) => {
    const { for_id, type } = req.body;

    try {
        const commentTotal = await commentService.blogCommentTotalService(for_id, type);
        res.send({
            status: 0,
            msg: '获取评论总数成功',
            data: commentTotal
        });
    } catch (error) {
        next(error);
    }
}

/**
 * 分页查找父级评论成功
 * type: 1 文章评论 2 说说评论
 */

export const getParentCommentList = async (req, res, next) => {
    // 当前页码
    let { current = 1, size, for_id, order, type } = req.body;

    // 每页内容数量
    const limit = parseInt(PARENT_COMMENT_PAGE_SIZE, 10) || 3;

    // 偏移量
    const offset = (current - 1) * limit;

    // 排序方式
    const orderArr = order == 'new' ? sqlFragment.commentOrderNew :sqlFragment.commentOrderHot

    const params = [for_id, type, limit, offset, orderArr]

    try {
        const list = await commentService.blogCommentParentListService(params);
        const total = await commentService.blogCommentTotalService(for_id, type);
        res.send({
            status: 0,
            msg: '分页查找评论成功',
            data: {
                current,
                size,
                total,
                list
            }

        });

    } catch (error) {
        next(error);
    }
}

/**
 * 获取子级评论列表
 */

export const getChildCommentList = async (req, res, next) => {

    const { current, size, type, for_id, user_id, parent_id } = req.body;

     // 每页内容数量
     const limit = parseInt(PARENT_COMMENT_PAGE_SIZE, 10) || 3;
 
     // 偏移量
     const offset = (current - 1) * limit;
 
     const params = [parent_id, limit, offset]

    try {
        const list = await commentService.blogCommentChildrenListService(params);
        res.send({
            status: 0,
            msg: '分页查找子评论成功',
            data: {
                current,
                size,
                list
            }
        });
        
    } catch (error) {
        next(error);
    }
}

/**
 * 添加评论
 */

export const addComment = async (req, res, next) => {
    const { type, for_id, from_id, from_name, from_avatar, content } = req.body;

    const params = [type, for_id, from_id, from_name, from_avatar, content]
    try {
        const result = await commentService.blogCommentAddService(params);
        
        res.send({
            status: 0,
            msg: '添加评论成功',
            data: result
        });
    } catch (err) {
        next(err);
    }
}