const mongoose = require("./index.js");

let Schema = mongoose.Schema;

/**
 * ztt_gj_love的图片
 * image 图片
 * desc 描述
*/
let photoSchema = new Schema({
    image: {type: String, required: true},
    desc: {type: String, default: "最美的老婆"}
});

let photoModel = mongoose.model('photo',photoSchema);

module.exports = photoModel;