import { connecttion } from "../app/database/mysql.js"

/**
 *  获取文章列表
 */
export const blogCategoryListService = async (params) => {

    let CategoryListSql = `
    SELECT 
       id,
       category_name
    FROM 
        blog_category
    `;

    // 执行查询
    const [CategoryListResult] = await connecttion.promise().query(CategoryListSql);

    // 返回结果
    return CategoryListResult

}
