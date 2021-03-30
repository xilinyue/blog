const express = require("express");
const photoModel = require("../../db/photoModel");

let router = express.Router();

/**
 * ztt_gj_love照片列表
 * 获取照片列表  懒加载
 */
 router.get("/photoList",(req,res) => {
    let {page, num} = req.query;
    num = num ? parseInt(num) : 10;
    page = page ? (parseInt(page) - 1)*num : 0;  // 默认值
    let options = {};
    photoModel.find(options,{__v: 0},{skip: page, limit: num}).then(docs => {
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