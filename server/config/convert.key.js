const fs = require('fs');
const path = require('path');

/**
 * 读取密钥文件
 */

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'));
const publicKey = fs.readFileSync(path.join(__dirname, 'public.key'));

/**
 * 转为Base64 格式
 */

const privateKeyBase64 = Buffer.from(privateKey).toString('base64');
const publicKeyBase64 = Buffer.from(publicKey).toString('base64');

/**
 * 输出转换结果
 */

console.log('\nprivate Key:');
console.log(privateKeyBase64);
console.log('\npublic Key:');
console.log(publicKeyBase64);