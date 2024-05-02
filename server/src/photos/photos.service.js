import { connecttion } from "../app/database/mysql.js";

/**
 * 获取所有相册
 */

export const getAllPhotos = async () => {
    const photosAllSql = `
    SELECT 
        * 
    FROM 
        blog_photo_album
    
    ORDER BY
        createdAT DESC
    `;
    const [data] = await connecttion.promise().query(photosAllSql);
    return data;
}

/**
 * 获取相册所有照片
 */

export const getAllPhotosByAlbumId = async (albumId) => {
    const photosAllSql = `
    SELECT 
        * 
    FROM 
        blog_photo
    WHERE
        album_id = ?
    ORDER BY
        createdAT DESC
    `;     
    const [data] = await connecttion.promise().query(photosAllSql, albumId);
    return data;
}
