const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const solt = 'my-blog';
// 改为使用异步的 `crypto.scrypt()`。
const key = crypto.scryptSync(solt, 'blog', 24);
// 使用 `crypto.randomBytes()` 生成随机的 iv 而不是此处显示的静态的 iv。
const iv = Buffer.alloc(16, 0); // 初始化向量。

//加密
function encodePassword(password) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex'); 
    encrypted += cipher.final('hex');
    return encrypted;
}

//解密
function decodePassword(e) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    // e -> encrypted
    let decrypted = decipher.update(e, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

exports.encodePassword = encodePassword;
exports.decodePassword = decodePassword;