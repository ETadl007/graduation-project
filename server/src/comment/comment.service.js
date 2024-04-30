import { connecttion } from "../app/database/mysql.js";

/**
 * 获取网站配置信息
 */

export const blogCommentTotalService = async () => {
    const commentTotalSql = `
    SELECT 
        COUNT(*) AS total
    FROM 
        blog_comment`;
    const [data] = await connecttion.promise().query(commentTotalSql);
    return data[0]['total']
}