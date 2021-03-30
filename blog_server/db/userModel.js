const mongoose = require("./index.js");

let Schema = mongoose.Schema;

/**
 * user_name 用户名
 * password 密码——加密
 * create_time 注册时间
 * is_admin true \|\| false 是否管理员
 * avator 头像图片地址
*/
let userSchema = new Schema({
    user_name: {type: String, required: true},
    password: {type: String, required: true},
    is_admin: {type: Boolean, default: false},
    avator: {type: String, default: 'http://47.104.155.124:3000/img/avator/defaultAvator.jpg'},
    create_time: {type: String,default: Date.now}
});

let userModel = mongoose.model('user',userSchema);

// 测试
// userModel.create({user_name: 'admin', password: '123456'}).then(doc => console.log(doc));
module.exports = userModel;