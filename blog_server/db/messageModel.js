const mongoose = require("./index");

let Schema = mongoose.Schema;

/**
 * user_name 留言用户名
 * avator 留言用户头像
 * content 建议使用html格式内容
 * create_time留言时间
 */
let messageSchema = new Schema({
    user_name: {type: String, required: true},
    avator: {type: String, required: true},
    title: {type: String, required: true},
    url: {type: String, required: true}
});

let messageModel = mongoose.model('messsage',messageSchema);

module.exports = messageModel;