const mongoose = require("./index.js");

let Schema = mongoose.Schema;

/**
 * title文章标题
 * content文章内容，使用vue-quill-editor编辑
 * summary文章摘要
 * create_time书写时间
 * update_time更新时间
 * likes点赞数
 * image列表展示图片
 * comments评论，是数组，内部包含字段——user_id,content,create_time 
 * is_recommend true or false 是否置顶
*/
let articleSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    summary: {type: String, required: true},
    tag: {type: String, required: true},
    create_time: {type: String,default: Date.now},
    update_time: {type: String,default: Date.now},
    likes: {type: Number, default: 0},
    image: {type: String, required: true},
    is_recommend: {type: Boolean, default: false},
    comments: [
        {type: Schema.Types.ObjectId, ref: 'comment'}
    ]
});

let articleModel = mongoose.model('article',articleSchema);

module.exports = articleModel;