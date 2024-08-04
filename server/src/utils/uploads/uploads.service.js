import { connecttion } from "../../app/database/mysql.js";

/**
 * 文件上传
 */
export const uploadFile = async (file, id) => {

    const { fieldname, filename, originalname, size, mimetype, path } = await file;

    const sql = `
        INSERT 
        INTO 
            blog_files (user_id, fieldname, filename, originalname, mimetype, size, path) 
        VALUES (?,?,?,?,?,?,?)
        `;

    const values = [id, fieldname, filename, originalname, mimetype, size, path];

    const [result] = await connecttion.promise().query(sql, values)

    return result;
}
