import { connecttion } from "../app/database/mysql.js";

/**
 * 获取通知列表
 */

export const getNotifyList = async (params) => {
    const statement = `
        SELECT 
            *
        FROM 
            blog_notify
        WHERE 
            user_id = ?
        ORDER BY
            isView ASC, createdAt DESC
        LIMIT ?
        OFFSET ?
    `;
    const [data] = await connecttion.promise().query(statement, params);
    return data;
}

/**
 * 获取通知总数
 */

export const getNotifyTotal = async (userId) => {
    const statement = `
        SELECT 
            COUNT(1) AS total
        FROM 
            blog_notify
        WHERE 
            user_id = ?
    `;
    const [data] = await connecttion.promise().query(statement, userId);
    return data[0].total;
}

/**
 * 阅读消息列表
 */

export const readNotifyList = async (userId) => {
    const statement = `
        UPDATE 
            blog_notify
        SET 
            isView = 2
        WHERE 
            user_id = ?
    `;
        
    const [data] = await connecttion.promise().query(statement, userId);
    return data;
}

/**
 * 删除通知
 */

export const deleteNotify = async (params) => {
    const statement = `
        DELETE FROM 
            blog_notify
        WHERE 
            id = ?
    `;
        
    const [data] = await connecttion.promise().query(statement, params);
    return data;
}