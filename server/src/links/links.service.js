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

/**
 * 新增友链 || 修改友链
 */

export const addOrUpdateLinks = async (data) => {
    let res;

    if (data.id) {
        // 修改友链
        const updateSql = `
        UPDATE 
            blog_links 
        SET 
            site_name = ?,
            site_desc = ?,
            site_avatar = ?,
            url = ?,
            status = ?
        WHERE
            id = ?;
        `;
        const [result] = await connecttion.promise().query(updateSql, [data.site_name, data.site_desc, data.site_avatar, data.url, data.status, data.id]);
        res = result.affectedRows > 0;
    } else {
        // 新增友链
        const insertSql = `
        INSERT INTO 
            blog_links (site_name, site_desc, site_avatar, url, status, user_id) 
        VALUES 
            (?,?,?,?,?,?);
        `;
        const [result] = await connecttion.promise().query(insertSql, [data.site_name, data.site_desc, data.site_avatar, data.url, data.status = 1, data.user_id]);
        res = result.insertId ? true : false;
    }

    return res;
}