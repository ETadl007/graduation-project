import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import sharp from'sharp';
import { fileURLToPath } from 'url';

const RandomFilename = (originalname) => {
    const randomBytes = crypto.randomBytes(16).toString('base64url');
    const extension = path.extname(originalname);
    return `${randomBytes}${extension}`;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, RandomFilename(file.originalname));
    }
});


// 文件类型和大小验证
const fileFilter = (req, file, cb) => {
    // 允许的文件类型
    const allowedMimeTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedMimeTypes.test(file.mimetype);
    const extname = allowedMimeTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('FILE_TYPE_NOT_SUPPORTED'));
    }
};


const uploadConfig = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } }).single('file');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 验证是否为图片文件
const validateImage = (req, res, next) => {
    
    const filePath = path.join(__dirname, '../../../uploads/images', req.file.filename);
    sharp(filePath)
        .metadata()
        .then(info => {
            if (info.format) {
                // 图片验证通过，继续后续处理中间件
                next();
            } else {
                // 如果图片格式无效，删除文件并返回错误
                fs.unlink(filePath, (err) => {
                    if (err) console.error(err);
                    next(new Error('INVALID_PICTURE_DELETE'))
                });
            }
        })
        .catch(err => {
            // 如果出现错误，删除文件并返回错误
            fs.unlink(filePath, (err) => {
                if (err) console.error(err);
                next(new Error('INVALID_PICTURE_DELETE'))
            });
        });
};

export {uploadConfig, validateImage};