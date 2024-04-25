import { connecttion } from "../app/database/mysql.js"

/**
 *  获取文章列表
 */
export const blogArticleListService = async (params) => {

    // SQL 语句
    let articleListSql = `
    SELECT 
    a.id, a.category_id, 
    a.createdAt,
    a.updatedAt, 
    a.author_id,
    a.article_title, 
    substr(a.article_content, 1, 50) AS article_content,
    a.article_cover, 
    a.is_top, 
    a.status, 
    a.type, 
    a.view_times, 
    a.article_description, 
    a.thumbs_up_times,
    a.reading_duration, 
    a.order, JSON_ARRAYAGG(IFNULL(t.tag_name, '')) AS tagNameList
    FROM 
        blog_article a 
    LEFT JOIN 
        blog_tag t ON a.id = t.id 
    GROUP BY 
        a.id 
    ORDER BY 
        a.createdAt DESC 
    LIMIT ?
    OFFSET ?
    `;

    // 执行查询
    const [articleListResult] = await connecttion.promise().query(articleListSql, params);

    // 返回结果
    return articleListResult

}

/**
 *  获取前台时间轴列表
 */
export const blogTimelineGetArticleList = async (params) => {

    // SQL 语句
    let TimelineSql = `
    SELECT
        YEAR(createdAt) AS year,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', id,
                'article_title', article_title,
                'article_cover', article_cover,
                'createdAt', createdAt
            )
        ) AS articleList
    FROM 
        blog_article 
    GROUP BY 
        YEAR(createdAt)
    ORDER BY 
        MAX(createdAt) DESC 
    LIMIT ?
    OFFSET ?
    `;

    // 执行查询
    const [TimelineResult] = await connecttion.promise().query(TimelineSql, params);

    // 返回结果
    return TimelineResult

}

/**
 * 获取文章总数
 */
export const blogArticleTotalService = async (params) => {
    const [totalResult] = await connecttion.promise().query("SELECT COUNT(*) AS total FROM blog_article");
    return totalResult[0].total
}