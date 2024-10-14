import { connecttion } from "../app/database/mysql.js";

/**
 * 获取当前用户对当前文章/说说/留言 是否点赞
 */


export const isLike = async (params) => {
    const statement = `
        SELECT 
            *
        FROM 
            blog_like
        WHERE 
            user_id = ? AND type = ? AND for_id = ?
    `;
        
    const [data] = await connecttion.promise().query(statement, params);
    return data[0] ? true : false;
}

/**
 * 点赞
 */
export const addLike = async (params) => {
    
    const statement = `
        INSERT INTO blog_like (type, for_id, user_id)
        VALUES (?,?,?)
    `;
    const [data] = await connecttion.promise().query(statement, params);

    if (params[1] == 1) {
        // 文章
        const ArticleThumbsUpSql = `
        UPDATE 
            blog_article
        SET 
            thumbs_up_times = thumbs_up_times + 1
        WHERE
            id = ?
        `;
        const [ArticleThumbsUpResult] = await connecttion.promise().query(ArticleThumbsUpSql, params[0]);

        return ArticleThumbsUpResult.affectedRows > 0 ? true : false;
    }else if (params[1] == 2) {
        // 说说
        const talkSql = `
        UPDATE 
            blog_talk 
        SET 
            like_times = like_times + 1 
        WHERE 
            id = ?
        `;
        const [data] = await connecttion.promise().query(talkSql, params[0]);
        return data.affectedRows > 0;
        
    } else if (params[1] == 3) {
        // 留言
        console.log(1);
        
    }
    return data.affectedRows === 1;
}

/**
 * 取消点赞
 */
export const cancelLike = async (params) => {
    const statement = `
        DELETE FROM blog_like
        WHERE type = ? AND for_id = ? AND user_id = ?
    `;
    if (params[1] == 1) {
        // 文章
        const ArticleCancelThumbsUpSql = `
        UPDATE 
            blog_article
        SET 
            thumbs_up_times = thumbs_up_times - 1
        WHERE
            id = ?
        `;
        const [ArticleCancelThumbsUpResult] = await connecttion.promise().query(ArticleCancelThumbsUpSql, params[0]);
        return ArticleCancelThumbsUpResult.affectedRows > 0 ? true : false;
    }else if (params[1] == 2) {
        // 说说
        const talkSql = `
        UPDATE 
            blog_talk 
        SET 
            like_times = like_times - 1     
        WHERE 
            id = ?
        `;
        const [data] = await connecttion.promise().query(talkSql, params[0]);
        return data.affectedRows > 0;
        
    } else if (params[1] == 3) {
        // 留言
        console.log(1);
        
    }
    const [data] = await connecttion.promise().query(statement, params);
    return data.affectedRows === 1;
}