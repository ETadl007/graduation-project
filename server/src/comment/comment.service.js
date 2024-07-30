import { connecttion } from "../app/database/mysql.js";
import { filterSensitive } from "../utils/sensitive.js";
import { addNotify } from "../notify/notify.controller.js";

/**
 * 获取评论总数
 */

export const blogCommentTotalService = async (params, type) => {
    const commentTotalSql = `
    SELECT 
        count(*) AS count 
    FROM 
        blog_comment  
    WHERE 
        for_id = ? AND type = ?;
    `;
    const [data] = await connecttion.promise().query(commentTotalSql, [params, type, params, type]);
    return data[0]["count"];
}

/**
 * 分页获取父级评论列表
 */

export const blogCommentParentListService = async (params) => {

    const commentParentListSql = `
    SELECT
        id,
        parent_id,
        for_id,
        type,
        from_id,
        from_name,
        from_avatar,
        to_id,
        to_name,
        to_avatar,
        content,
        thumbs_up,
        createdAt,
        updatedAt 
    FROM
        blog_comment
    WHERE
        for_id = ? AND type = ? AND parent_id IS NULL
    ORDER BY
        ${params[4]}
    LIMIT ?
    OFFSET ?
    `;
    const [data] = await connecttion.promise().query(commentParentListSql, params);

    return data;
}

/**
 * 分页获取子级评论列表
 */

export const blogCommentChildrenListService = async (params) => {
    const commentChildrenListSql = `
    SELECT
        id,
        parent_id,
        for_id,
        type,
        from_id,
        from_name,
        from_avatar,
        to_id,
        to_name,
        to_avatar,
        content,
        thumbs_up,
        createdAt,
        updatedAt 
        
    FROM
        blog_comment
        
    WHERE
        parent_id = ?
        
    ORDER BY
        createdAt DESC
    LIMIT ?
    OFFSET ?
    `;

    const [data] = await connecttion.promise().query(commentChildrenListSql, params);

    return data;

}

/**
 * 添加评论
 */

export const blogCommentAddService = async (params) => {
    const commentAddSql = `
    INSERT INTO
        blog_comment

    SET
        type = ?,
        for_id = ?,
        from_id = ?,
        from_name = ?,
        from_avatar = ?,
        content = ?
    `;

    const [data] = await connecttion.promise().query(commentAddSql, params);
    return data;
}

/**
 * 点赞评论
 */

export const blogCommentThumbsUpService = async (params) => {
    const commentThumbsUpSql = `
    UPDATE
        blog_comment
    SET
        thumbs_up = thumbs_up + 1
    WHERE
        id = ?
    `;

    const [data] = await connecttion.promise().query(commentThumbsUpSql, params);
    return data.affectedRows > 0;
}

/**
 * 取消点赞评论
 */

export const blogCommentCancelThumbsUpService = async (params) => {
    const commentCancelThumbsUpSql = `
    UPDATE
        blog_comment
    SET
        thumbs_up = thumbs_up - 1
    WHERE
        id = ?
    `;

    const [data] = await connecttion.promise().query(commentCancelThumbsUpSql, params);
    return data.affectedRows > 0;
}

/**
 * 添加回复评论
 */

const applyComment = async (comment) => {

    const { parent_id, type, for_id, from_id, from_avatar, from_name, to_id, to_name, to_avatar, content, ip } = comment;
    const commentAddSql = `
    INSERT INTO
        blog_comment

    SET
        parent_id = ?,
        type = ?,
        for_id = ?,
        from_id = ?,
        from_avatar = ?,
        from_name = ?,
        to_id = ?,
        to_name = ?,
        to_avatar = ?,
        content = ?,
        ip = ?
    `;


    // 查询当前评论用户信息
    const userInfoSql = `
    SELECT
        blog_comment.id AS comment_id,        
        blog_comment.parent_id,
        blog_comment.for_id,
        blog_comment.type,
        blog_comment.from_id,
        blog_comment.from_name,
        blog_comment.from_avatar,
        blog_comment.to_id,
        blog_comment.to_name,
        blog_comment.to_avatar,
        blog_comment.content,
        blog_comment.thumbs_up,
        blog_comment.ip,
        blog_comment.createdAt,
        blog_comment.updatedAt,
        user.id AS user_id,                   
        user.username AS username,
        user.avatar AS avatar
    FROM
        blog_comment
    JOIN
        blog_user AS user
    ON
        blog_comment.from_id = user.id
    WHERE
        user.id = ?;
    `;

    try {
        const [data] = await connecttion.promise().query(commentAddSql, [parent_id, type, for_id, from_id, from_avatar, from_name, to_id, to_name, to_avatar, content, ip]);
        const [userInfo] = await connecttion.promise().query(userInfoSql, [comment.from_id]);

        return userInfo[0];
    } catch (error) {
        console.log(error);
    }



}

export const applyCommentHandler = async (req, res) => {
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
    req.body.content = await filterSensitive(req.body.content);

    const comment = { ...req.body, ip: ip.split(':').pop() };

    const { type, for_id, from_name, content, from_id, to_id } = req.body;

    const result = await applyComment(comment);

    if (from_id !== to_id) {
        await addNotify({
            user_id: to_id,
            type: type,
            to_id: for_id,
            message: `您收到了来自 ${from_name} 的评论回复: ${content}！`,
        });
    }
    return result;
}
