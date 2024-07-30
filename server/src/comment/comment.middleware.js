import { filterSensitive } from '../utils/sensitive.js';

/**
 * 敏感词过滤
 */

export const filterSensitiveMiddleware = async (req, res, next) => {
    try {
        req.body.content = await filterSensitive(req.body.content);
        next();
      } catch (error) {
        console.log(error);
        next(new Error('ADDREPLYCOMMENTERROR'))
      }
}
