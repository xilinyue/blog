/**
 * 腾讯云存储
 * SecretId: AKIDRfYFhF5iZ4F9rKzSdXBXeT1LQGp7RsLD
 * SecretKey: DLCm5aolRqTqwkHYXFgspUs0sTmobDYb
 */
 var COS = require('cos-nodejs-sdk-v5');
 var cos = new COS({
     SecretId: 'AKIDRfYFhF5iZ4F9rKzSdXBXeT1LQGp7RsLD',
     SecretKey: 'DLCm5aolRqTqwkHYXFgspUs0sTmobDYb'
 });

/**
 * 上传
 */
function upload(file,path) {
    return new Promise((resolve,reject) => {
        cos.putObject({
            Bucket: 'love-1257444045',
            Region: 'ap-shanghai',
            Key: path,
            Body: file,
        }, function (err, data) {
            if (err) {
                console.log(err);
                reject("失败");
            }
            resolve(data); 
        });
    });
}

exports.upload = upload;