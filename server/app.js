import app from './src/main.js'
import { APP_PORT } from './src/app/app.config.js';
import { connecttion } from "./src/app/database/mysql.js";



app.listen(APP_PORT, () => {
    console.log(`服务已启动！ http://localhost:${APP_PORT}`);
});

/**
 * 测试连接数据库
 */
connecttion.connect((err) => {
    if (err) {
        console.log("数据库连接失败", err.message);
        return;
    }
    console.log("数据库连接成功！");
});
