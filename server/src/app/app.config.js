import dotenv from "dotenv";

dotenv.config();

/**
 * 应用配置
 */
export const APP_PORT = process.env.APP_PORT || 3000;

/**
 * 数据库配置
 */
export const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;