import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../app/app.config.js';

/**
 * 签发令牌
 */

export const signToken = (options = { payload }) => {
    const { payload } = options

    // 签发 JWT
    const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '1h' })

    // 提供 JWT
    return token;
}