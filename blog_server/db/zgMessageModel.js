const mongoose = require("./index.js");

let Schema = mongoose.Schema;

/**
 * ztt_gj_love的留言版
 * userId留言人的_id
 * userName 留言人
 * avatar留言人的头像
 * message 留言内容
*/
let zgMessageSchema = new Schema({
    user: {type: Schema.ObjectId,ref: 'user',required: true},
    content: {type: String, required: true},
    create_time: {type: String,default: Date.now}
});

let zgMessageModel = mongoose.model('zgMessage',zgMessageSchema);

module.exports = zgMessageModel;