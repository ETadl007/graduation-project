import * as articleService from './article.service.js';
import { PAGE_SIZE } from '../app/app.config.js'

/**
 *  获取文章列表
 */
export const getArticleList = async (req, res, next) => {

    // 当前页码
    let { current = 1, size } = req.params;

    // 每页内容数量
    const limit = parseInt(PAGE_SIZE, 10) || 10;

    // 偏移量
    const offset = (current - 1) * limit;

    const params = [limit, offset]

    try {
        // 获取文章列表
        const articleList = await articleService.blogArticleListService(params);
        // 获取文章数量
        const articleCount = await articleService.blogArticleTotalService();
        res.status(200).send({
            status: 0,
            message: "获取文章列表成功",
            data: {
                current,
                size,
                list: articleList,
                total: articleCount
            }
        });

    } catch (err) {
        next(err);
    }

}

/**
 *  获取前台时间轴列表
 */
export const getArticleTimeLineList = async (req, res, next) => {
    // 当前页码
    let { current = 1, size } = req.params;

    // 每页内容数量
    const limit = parseInt(PAGE_SIZE, 10) || 10;

    // 偏移量
    const offset = (current - 1) * limit;

    const params = [limit, offset]

    try {
        // 获取前台时间轴列表
        const articleTimeLineList = await articleService.blogTimelineGetArticleList(params);
        // 获取文章数量
        const articleCount = await articleService.blogArticleTotalService();
        res.status(200).send({
            status: 0,
            message: "获取文章时间轴列表成功",
            data: {
                current,
                size,
                list: articleTimeLineList,
                total: articleCount
            }
        });
    }
    catch (err) {
        next(err);
    }
}

/**
 * 根据文章id获取文章详情
 */

export const getArticleDetail = async (req, res, next) => {
    const { id } = req.params;
    try {
        const articleDetail = await articleService.blogArticleByIdService(id);
        // 如果文章不存在，直接返回失败响应
        if (!articleDetail) {
            return res.status(500).send({
                status: 1,
                message: "获取文章详情失败"
            });
        }
        res.status(200).send({
            status: 0,
            message: "获取文章详情成功",
            data: articleDetail

        });

    } catch (err) {
        next(err);
    }
}

/**
 * 根据文章id获取推荐文章
 */

export const getArticleRecommend = async (req, res, next) => {
    const { id } = req.params;
    try {
        const articleRecommend = await articleService.blogArticleRecommendService(id);
        // 如果文章推荐不存在，直接返回失败响应
        if (!articleRecommend) {
            return res.status(500).send({
                status: 1,
                message: "获取文章推荐失败"
            });
        }
        res.status(200).send({
            status: 0,
            message: "获取文章推荐成功",
            data: articleRecommend

        });

    } catch (err) {
        next(err);
    }
}