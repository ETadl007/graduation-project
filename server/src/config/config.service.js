import { connecttion } from "../app/database/mysql.js";

/**
 * 获取网站配置信息
 */

export const getWebConfig = async () => {
    const configSql = `
    SELECT 
        * 
    FROM 
        blog_config`;
    const [data] = await connecttion.promise().query(configSql);
    return data[0];
}