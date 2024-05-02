import { connecttion } from "../app/database/mysql.js"

/**
 *  获取文章列表
 */
export const blogArticleListService = async (params) => {

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
        a.order AS article_order,
        JSON_ARRAYAGG(IFNULL(t.tag_name, '')) AS tagNameList
    FROM 
        blog_article a 
    LEFT JOIN
        blog_article_tag at ON a.id = at.article_id
    LEFT JOIN 
        blog_tag t ON at.tag_id = t.id
    GROUP BY 
        a.id 
    ORDER BY 
        a.is_top ASC, article_order ASC, a.createdAt DESC
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

/**
 * 根据文章id获取文章详情
 */

export const blogArticleByIdService = async (params) => {
    let articleByIdSql = `
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
            a.order, 
            JSON_ARRAYAGG(IFNULL(t.id, '')) AS tagIdList,
            JSON_ARRAYAGG(IFNULL(t.tag_name, '')) AS tagNameList,
            u.username AS authorName,
            c.category_name AS categoryName
        fROM
            blog_article a
        LEFT JOIN
            blog_tag t ON a.id = t.id
        LEFT JOIN
            blog_category c ON a.id = c.id
        LEFT JOIN
            blog_user u ON a.id = u.id
        WHERE
            a.id = ?
        GROUP BY
            a.id
        `
    const [articleByIdResult] = await connecttion.promise().query(articleByIdSql, params);
    return articleByIdResult[0]
}

/**
 * 根据文章id获取推荐文章
 */

export const blogArticleRecommendService = async (params) => {
    let articleRecommendSql = `
    SELECT
    CASE
        WHEN id = 1 THEN JSON_OBJECT('id', id, 'article_title', article_title, 'article_cover', article_cover)
        ELSE JSON_OBJECT('id', id - 1, 'article_title', (SELECT article_title FROM blog_article WHERE id = a.id - 1), 'article_cover', (SELECT article_cover FROM blog_article WHERE id = a.id - 1))
    END AS previous,
    CASE
        WHEN id = (SELECT MAX(id) FROM blog_article) THEN NULL
        ELSE JSON_OBJECT('id', id + 1, 'article_title', (SELECT article_title FROM blog_article WHERE id = a.id + 1), 'article_cover', (SELECT article_cover FROM blog_article WHERE id = a.id + 1))
    END AS next,
    JSON_ARRAYAGG(JSON_OBJECT('createdAt', createdAt, 'id', id, 'article_title', article_title, 'article_cover', article_cover)) AS recommend
    FROM
        blog_article AS a
    WHERE
        id = ?
        `
    //查询文章id是否存在
    const [articleExistResult] = await connecttion.promise().query("SELECT * FROM blog_article WHERE id = ?", params);

    if (articleExistResult.length === 0) {
        return false
    }

    const [articleRecommendResult] = await connecttion.promise().query(articleRecommendSql, params);
    return articleRecommendResult[0]
}

/**
 * 通过标签id 获取到文章列表
 */

export const blogArticleByTagIdService = async (params) => {
    const ArticleByTagIdSql = `
    SELECT 
        ba.createdAt,
        ba.article_title,
        ba.id,
        ba.article_cover
    FROM 
        blog_article_tag bat
    INNER JOIN 
        blog_article ba ON bat.article_id = ba.id
    WHERE 
        bat.tag_id = ?

    ORDER BY
        ba.createdAt DESC
    LIMIT ?
    OFFSET ?
    `;

    const [ArticleByTagIdResult] = await connecttion.promise().query(ArticleByTagIdSql, params);
    return ArticleByTagIdResult
}

/**
 * 通过标签id 获取到文章总数
 */

export const blogArticleByTagIdTotalService = async (id) => {
    const ArticleByTagIdTotalSql = `
        SELECT 
            COUNT(*) AS total_count
        FROM
            blog_article a
        JOIN 
            blog_tag t ON t.id = a.id
        WHERE
            t.id = ?
    `;
    const [ArticleByTagIdTotalResult] = await connecttion.promise().query(ArticleByTagIdTotalSql, id);
    return ArticleByTagIdTotalResult[0].total_count
}
