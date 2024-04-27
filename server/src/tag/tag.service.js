import { connecttion } from "../app/database/mysql.js";

/**
 * 获取所有标签
 */

export const getAllTag = async () => {
    const tagAllSql = `
    SELECT 
        * 
    FROM 
        blog_tag`;
    const [data] = await connecttion.promise().query(tagAllSql);
    return data;
}