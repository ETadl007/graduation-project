import { connecttion } from "../app/database/mysql.js";

/**
 * 用户注册
 */

export const createUser = async (params) => {
    const statment = `
        INSERT INTO blog_user 
        (username, password, role)
        VALUES
        (?, ?, ?)
    `
    const [data] = await connecttion.promise().query(statment, params);
    return data;
}

/**
 * 按用户名查询用户
 */

export const getUserByName = async (name, options = {}) => {

    const { password } = options;

    const statment = `
    SELECT 
        id, 
        username,
        role
        ${password ? ', password' : ''} 
    FROM 
        blog_user 
    WHERE 
        username = ?
    `;
    const [data] = await connecttion.promise().query(statment, name);

    // 只提供第一个用户信息
    return data[0];
}

/**
 * 获取当前登录用户信息
 */

export const getUserById = async (id) => {
    const statment = `
        SELECT 
            id, 
            username,
            role,
            avatar,
            nick_name
        FROM 
            blog_user 
        WHERE 
            id = ?
    `;
        
    const [data] = await connecttion.promise().query(statment, id);
    return data[0]
}