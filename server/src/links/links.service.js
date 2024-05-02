import { connecttion } from "../app/database/mysql.js";

/**
 * 获取友链列表
 */

export const getLinksList = async (params) => {
    const linksSql = `
    SELECT 
        * 
    FROM 
        blog_links
    WHERE
        status = ?
    ORDER BY 
        createdAt DESC 
    LIMIT ? 
    OFFSET ?;
    `;
    const [data] = await connecttion.promise().query(linksSql, params);
    return data;
}

/**
 * 获取友链总数
 */

export const getLinksCount = async () => {
    const linksSql = `
    SELECT 
        COUNT(*) AS count 
    FROM 
        blog_links
    WHERE
        status = ?;
    `;
        
    const [data] = await connecttion.promise().query(linksSql, 1);
    return data[0].count;
}