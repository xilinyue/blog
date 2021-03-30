const mongoose = require("./index.js");

let Schema = mongoose.Schema;

/**
 * ztt_gj_love的轮播图
 * image 图片
*/
let swipeSchema = new Schema({
    image: {type: String, required: true},
});

let swipeModel = mongoose.model('swipe',swipeSchema);

module.exports = swipeModel;