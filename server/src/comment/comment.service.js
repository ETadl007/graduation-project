import { connecttion } from "../app/database/mysql.js";

/**
 * 获取评论总数
 */

export const blogCommentTotalService = async (params) => {
    const commentTotalSql = `
    SELECT 
        COUNT(*) AS total
    FROM 
        blog_comment
        
    WHERE
        for_id = ? OR parent_id IN (SELECT id FROM blog_comment WHERE for_id = ?)
        `;
    const [data] = await connecttion.promise().query(commentTotalSql, [params, params]);
    return data[0]['total']
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
        for_id = ?
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

