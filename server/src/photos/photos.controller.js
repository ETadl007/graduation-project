import * as photosService from './photos.service.js';

/**
 * 获取所有相册列表
 */

export const storePhotos = async (req, res, next) => {
    try {
        const photos = await photosService.getAllPhotos();
        res.send({
            status: 0,
            message: '获取所有相册列表成功',
            data: photos
        });
    } catch (err) {
        next(err)
    }
}

/**
 * 获取相册所有照片
 */

export const getPhotos = async (req, res, next) => {
    const { id } = req.params;
    try {
        const photos = await photosService.getAllPhotosByAlbumId(id);
        res.send({
            status: 0,
            message: '获取相册所有照片成功',
            data: photos

        });
        
    } catch (err) {
        next(err)
    }
}
