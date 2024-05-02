import express from 'express';
import * as photosController from './photos.controller.js';

const router = express.Router();

/**
 * 获取所有的相册
 */
router.get('/api/photoAlbum/getAllAlbumList', photosController.storePhotos);

/**
 * 获取相册所有照片
 */

router.get('/api/photo/getAllPhotosByAlbumId/:id', photosController.getPhotos);

/**
 * 导出路由
 */
export default router;