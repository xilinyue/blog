const express = require("express");
const swipeModel = require("../../db/swipeModel")

let router = express.Router();

/**
 * ztt_gj_love轮播图
 * 获取所有swipe列表
 */
 router.get("/swipeList",(req,res) => {
    swipeModel.find({}).then(docs => {
        res.send({
            code: 0,
            message: "数据获取成功",
            data: docs
        });
    }).catch(err => {
        res.send({
            code: 5,
            message: "服务器错误",
            data: err
        });
    });
});
module.exports = router;