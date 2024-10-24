import { connecttion } from "../app/database/mysql.js";
import { getIsLikeByIdAndType } from "../like/like.service.js"

/**
 * 获取父/字级评论总数
 */

export const blogCommentService = async (for_id, type, parent_id) => {

    try {
         // 构建查询条件
    let condition;
    let params;

    if (parent_id === undefined) {
      // 查询父级评论总数
      condition = 'parent_id IS NULL';
      params = [for_id, type];
    } else {
      // 查询特定父级评论的子评论总数
      condition = 'parent_id = ?';
      params = [for_id, type, parent_id];
    }

    const commentTotalSql = `
    SELECT 
        count(*) AS count 
    FROM 
        blog_comment  
    WHERE 
        for_id = ? AND type = ? AND ${condition};
    `;
    const [data] = await connecttion.promise().query(commentTotalSql, params);
    return data[0]["count"];
    } catch (error) {
        console.log(error);
        throw error
    }
}

/**
 * 获取评论总数
 */
export const blogCommentTotalService = async (for_id, type) => {

    try {

    const commentTotalSql = `
    SELECT 
        count(*) AS count 
    FROM 
        blog_comment  
    WHERE 
        for_id = ? AND type = ?;
    `;
    const [data] = await connecttion.promise().query(commentTotalSql, [for_id, type]);
    return data[0]["count"];
    } catch (error) {
        console.log(error);
        throw error
    }
}


/**
 * 分页获取父级评论列表
 */

export const blogCommentParentListService = async ({ for_id, type, limit, offset, orderArr, user_id }) => {

    try {
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
        updatedAt,
        ip 
    FROM
        blog_comment
    WHERE
        for_id = ? AND type = ? AND parent_id IS NULL
    ORDER BY
        ${orderArr}
    LIMIT ?
    OFFSET ?
    `;
        const [data] = await connecttion.promise().query(commentParentListSql, [for_id, type, limit, offset]);

        // 判断当前登录的用户是否以点赞
        const isLikePromises = data.map(async (item) => {
            return getIsLikeByIdAndType({ for_id: item.id, type: 4, user_id: user_id || item.ip });
        });

        const likeResults = await Promise.all(isLikePromises);
        data.forEach((item, index) => {
            item.is_like = likeResults[index];
        });

        return data;
    } catch (error) {
        console.log(error);

        throw error
    }

}

/**
 * 分页获取子级评论列表
 */

export const blogCommentChildrenListService = async ({parent_id, limit, offset, user_id}) => {
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
        updatedAt,
        ip 
    FROM
        blog_comment
        
    WHERE
        parent_id = ?
        
    ORDER BY
        createdAt DESC
    LIMIT ?
    OFFSET ?
    `;

    const [data] = await connecttion.promise().query(commentChildrenListSql, [parent_id, limit, offset]);

    // 判断当前登录的用户是否以点赞
    const isLikePromises = data.map(async (item) => {
        return getIsLikeByIdAndType({ for_id: item.id, type: 4, user_id: user_id || item.ip });
    });

    const likeResults = await Promise.all(isLikePromises);
    data.forEach((item, index) => {
        item.is_like = likeResults[index];
    });

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

export const applyComment = async (comment) => {

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
        throw error
    }

}

/**
 * 删除评论
 */

export const deleteComment = async (id, parent_id) => {

    let res;
    try {
        //如果只有父级评论，则直接删除
        if (parent_id > 0) {
            const sql = `DELETE FROM blog_comment WHERE id = ?`
            const [data] = await connecttion.promise().query(sql, [id]);
            res = data;
        } else {
            // 如果没有父级评论，删除这条评论以及所有子级评论
            const mainsql = `DELETE FROM blog_comment WHERE id = ?`
            const subsql = `DELETE FROM blog_comment WHERE parent_id = ?`
            const [maindata] = await connecttion.promise().query(mainsql, [id]);
            const [subdata] = await connecttion.promise().query(subsql, [id]);

            res = maindata;
        }
        return res ? res.affectedRows : null;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}

/**
 * 通过用户id查询用户信息
 */

export const getUserInfoByUserId = async (userId) => {
    const sql = `
    SELECT
        thumbs_up,
        id,
        type,
        for_id,
        from_id,
        from_name,
        from_avatar,
        content,
        ip,
        updatedAt,
        createdAt
    FROM
        blog_comment
    WHERE
        from_id = ?
    `;

    const [data] = await connecttion.promise().query(sql, [userId]);
    return data[0];
}