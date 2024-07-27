import { connecttion } from "../app/database/mysql.js";

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