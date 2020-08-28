const express  = require("express");
const articleInfoModel = require("../../db/articleInfoModel");

let router = express.Router();

/**
 * 获取文章标签接口
 */
router.get("/listTag", (req,res) => {
    articleInfoModel.find({},{__v: 0,_id: 0}).then(docs => {
        res.send({
            code: 0,
            message: '获取数据成功',
            data: docs[0]
        })
    }).catch(err => {
        res.send({
            code: 5,
            message: '服务器错误',
            data: err
        })
    });
});

module.exports = router;