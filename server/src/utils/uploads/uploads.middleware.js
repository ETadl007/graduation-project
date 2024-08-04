import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

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

const uploadConfig = multer({ storage }).single('file');



export default uploadConfig;