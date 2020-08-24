const mongoose = require("./index");

let Schema = mongoose.Schema;

/**
 * iamge图片地址
 * title标题
 * url文章_id
 */
let bannerSchema = new Schema({
    image: {type: String, required: true},
    title: {type: String, required: true},
    url: {type: String, required: true}
});

let bannerModel = mongoose.model('banner',bannerSchema);

module.exports = bannerModel;