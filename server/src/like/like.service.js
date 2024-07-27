import { connecttion } from "../app/database/mysql.js";

/**
 * 获取当前用户对当前文章/说说/留言 是否点赞
 */


export const isLike = async (params) => {
    const statement = `
        SELECT 
            *
        FROM 
            blog_like
        WHERE 
            user_id = ? AND type = ? AND for_id = ?
    `;
        
    const [data] = await connecttion.promise().query(statement, params);
    return data[0] ? true : false;
}

/**
 * 点赞
 */
export const addLike = async (params) => {
    const statement = `
        INSERT INTO blog_like (type, for_id, user_id)
        VALUES (?,?,?)
    `;
    const [data] = await connecttion.promise().query(statement, params);
    return data.affectedRows === 1;
}

/**
 * 取消点赞
 */
export const cancelLike = async (params) => {
    const statement = `
        DELETE FROM blog_like
        WHERE type = ? AND for_id = ? AND user_id = ?
    `;
    const [data] = await connecttion.promise().query(statement, params);
    return data.affectedRows === 1;
}