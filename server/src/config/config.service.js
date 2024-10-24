import { connecttion } from "../app/database/mysql.js";

/**
 * 获取网站配置信息
 */

export const getWebConfig = async () => {
    const configSql = `
    SELECT 
        * 
    FROM 
        blog_config
    `;
    const [data] = await connecttion.promise().query(configSql);
    return data[0];
}

export const addView = async (configId) => {
    const addViewSql = `
    UPDATE
        blog_config
    SET
        view_time = view_time + 1
    WHERE
        id = ?
    `
    const [data] = await connecttion.promise().query(addViewSql, [configId]);

    return data
}