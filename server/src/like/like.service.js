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
