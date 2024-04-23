import { connection } from "../app/database/mysql"

/**
 *  获取文章列表
 */
export const getArticleListService = async (current, size) => {

    //查分页数据
    let articleListSql = "SELECT a.`id`, a.`category_id`, a.`createdAt`, a.`updatedAt`, a.`author_id`, a.`article_title`, substr(a.`article_description`, 1, 50) AS `article_content`, a.`article_cover`, a.`is_top`, a.`status`, a.`type`, a.`createdAt`, a.`updatedAt`, a.`view_times`, a.`article_description`, a.`thumbs_up_times`, a.`reading_duration`, a.`order`, t.`tag_name` FROM `blog_article` a LEFT JOIN `blog_tag` t ON a.`id` = t.`id` GROUP BY a.`id` ORDER BY a.`createdAt` DESC LIMIT ?, ?";
    const totalArticlesSql = "SELECT COUNT(*) AS total_articles FROM `blog_article`"

    let articleListSqlParams = params.concat([(current - 1) * size, parseInt(size)]);

    const articleListResult = await connection.promise().query(articleListSql, articleListSqlParams);
    const totalArticles = await connection.promise().query(totalArticlesSql);

    // 在查询结果中添加 tagNameList 字段
    articleListResult.forEach(result => {
        result.tagNameList = result.tag_name ? [result.tag_name] : [];
        delete result.tag_name; // 删除tag_name字段
    });

    return articleListResult, totalArticles
}