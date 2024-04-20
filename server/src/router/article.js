const express = require("express")
const router = express.Router()
const seq = require("../db/index")

// 获取文章列表
router.get("/blogHomeGetArticleList/:current/:size", async (req, res) => {
    /**
         * 分页：
         * page 页码
         * pageSize 分页大小
         * 
     */
    let { current, size } = req.params;

    current = current || 1;
    size = size || 5;

    let params = [];

    // let whereSqlStr = whereSqls.length > 0 ? " WHERE " + whereSqls.join(" AND ") : "";

    //查分页数据
    let articleListSql = "SELECT a.`id`, a.`category_id`, a.`createdAt`, a.`updatedAt`, a.`author_id`, a.`article_title`, substr(a.`article_description`, 1, 50) AS `article_content`, a.`article_cover`, a.`is_top`, a.`status`, a.`type`, a.`createdAt`, a.`updatedAt`, a.`view_times`, a.`article_description`, a.`thumbs_up_times`, a.`reading_duration`, a.`order`, t.`tag_name` FROM `blog_article` a LEFT JOIN `blog_tag` t ON a.`id` = t.`id` GROUP BY a.`id` ORDER BY a.`createdAt` DESC LIMIT ?, ?";
    const totalArticlesSql = "SELECT COUNT(*) AS total_articles FROM `blog_article`" 

    let articleListSqlParams = params.concat([(current - 1) * size, parseInt(size)]);  

    const articleListResult = await seq(articleListSql, articleListSqlParams);
    const totalArticles = await seq(totalArticlesSql)

    // 在查询结果中添加 tagNameList 字段
    articleListResult.forEach(result => {
        result.tagNameList = result.tag_name ? [result.tag_name] : [];
        delete result.tag_name; // 删除tag_name字段
    });

    if (articleListResult.err == null && totalArticles.err == null) {
        res.send({
            status: 0,
            msg: "查询成功",
            data: {
                current,
                size,
                list: articleListResult,
                total: totalArticles[0].total_articles
            }
        })

    } else {
        res.send({
            status: 1,
            msg: "查询失败",
        })
    }

})

module.exports = router