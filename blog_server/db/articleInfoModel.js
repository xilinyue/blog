const mongoose = require("./index.js");

let Schema = mongoose.Schema;

/**
 * tags文章标签
 * num 文章总数
*/
let articleInfoSchema = new Schema({
    tags: [String],
    num: {type: Number, required: true}
});

let articleInfoModel = mongoose.model('articleInfo',articleInfoSchema);

// articleInfoModel.create({tags: ['Html', 'Node','Vue'],num: 0});

module.exports = articleInfoModel;