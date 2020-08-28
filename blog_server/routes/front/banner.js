const express  = require("express");
const bannerModel = require("../../db/bannerModel");

let router = express.Router();

/**
 * 获取所有banner列表
 */
router.get("/bannerList",(req,res) => {
    bannerModel.find({}).then(docs => {
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