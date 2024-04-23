import * as articleService from './article.service.js';

/**
 *  获取文章列表
 */

export const getArticleList = async (req, res, next) => {

    /**
     * 分页：
     * page 页码
     * pageSize 分页大小
     * 
    */

    let { current, size } = req.params;

    current = current || 1;
    size = size || 5;

    // 获取文章列表
    try {
        const articleList = await articleService.getArticleListService(current, size);
        res.status(200).send({
            status: 0,
            msg: "获取文章列表成功",
            data: {
                current,
                size,
                list:articleList,
                total: articleList.length
            }
        });

} catch (err) {
    next(err);
}

}
