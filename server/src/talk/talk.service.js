import { connecttion } from "../app/database/mysql.js";

/**
 * 获取说说列表
 */

export const getTalkList = async (params) => {
    const talkSql = `
    SELECT 
        ta.*, 
        bu.username AS nick_name, 
        bu.avatar AS avatar, 
        JSON_ARRAYAGG(IFNULL(tp.url, '')) AS talkImgList 
    FROM 
        blog_talk ta 
    LEFT JOIN 
        blog_user bu ON ta.user_id = bu.id 
    LEFT JOIN 
        blog_talk_photo tp ON tp.talk_id = ta.id 
    GROUP BY 
        ta.id, bu.username, bu.avatar 
    ORDER BY 
        ta.createdAt DESC 
    LIMIT 5 
    OFFSET 0;
    `;
    const [data] = await connecttion.promise().query(talkSql, params);
    return data;
}

/**
 * 获取说说总数
 */

export const getTalkCount = async () => {
    const talkSql = `
    SELECT 
        COUNT(*) AS count 
    FROM 
        blog_talk
    `;
    const [data] = await connecttion.promise().query(talkSql);
    return data[0].count;
}