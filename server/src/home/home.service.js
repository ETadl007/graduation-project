import { connecttion } from "../app/database/mysql.js";

/**
 * 获取数据统计
 */

export const getStatistic = async () => {
    const statisticgSql = `
    SELECT 
        (SELECT COUNT(*) FROM blog_article) AS articleCount,
        (SELECT COUNT(*) FROM blog_category) AS categoryCount,
        (SELECT COUNT(*) FROM blog_tag) AS tagCount,
        (SELECT COUNT(*) FROM blog_user) AS userCount
    `;
    const [data] = await connecttion.promise().query(statisticgSql);
    return data[0];
}