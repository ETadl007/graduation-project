/*
 * 文章相关接口
*/

/*
    "result": {
    "current": "1",
    "size": "5",
    "list": [
      {
        "createdAt": "2023-05-19 19:47:44",
        "updatedAt": "2024-03-28 11:45:50",
        "id": 6,
        "article_title": "博客部署教程-宝塔面板",
        "author_id": 1,
        "category_id": 2,
        "article_description": "这篇文章是在第一篇普通部署教程的基础上，使用宝塔面板部署的，确实方便了很多。",
        "article_cover": "http://img.mrzym.top/FtAnnRvDr78EeHrSJc9IM3fabRiN",
        "is_top": 1,
        "order": 1,
        "status": 1,
        "type": 1,
        "view_times": 5915,
        "thumbs_up_times": 77,
        "reading_duration": 4050349466,
        "categoryName": "博客部署",
        "tagNameList": [
          "linux",
          "阿里云轻量服务器",
          "宝塔面板"
        ]
      },
*/



// 获取分页文章列表
const getAllArticles = async (req, res,) => {
    
};

// 根据id获取文章
const getArticleById = async (req, res,) => {

};

// 创建文章
const createArticle = async (req, res,) => {

};

// 更新文章
const updateArticle = async (req, res,) => {

};

// 删除文章
const deleteArticle = async (req, res,) => {

};

// 更新文章置顶状态
const updateArticleTopStatus = async (req, res,) => {

};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    updateArticleTopStatus
};