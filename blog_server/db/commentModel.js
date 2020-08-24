const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
    user_name: {type: String, required: true},
    avator: {type: String, required: true},
    content: {type: String, required: true},
    create_time: {type: Date, default: Date.now}
});


let commentModel = mongoose.model('comment',commentSchema);

// 测试
module.exports = commentModel;