const bannerModel = require("../../db/bannerModel");
const express = require("express");

let router = express.Router();

/**
 * 添加轮播图
 * iamge 图片地址  固定同一个长宽
 * title 标题
 * url 文章_id
 */
router.post("/addBanner",(req,res) => {
    let {image, title, url} = req.body;
    if (!image || !title || !url) {
        res.send({
            code: 4,
            message: "参数不完整",
        });
        return true;
    }
    bannerModel.create({image,title,url}).then(doc => {
        res.send({
            code: 0,
            message: "上传成功"
        });
    }).catch(err => {
        res.send({
            code: 5,
            message: "服务器错误",
            data: err
        });
    });
});

/**
 * 获取轮播图列表
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

/**
 * 删除轮播图
 */
router.delete("/deleteBannerById",(req,res) => {
    let {_id} = req.query;
    if(!_id){
        res.send({
            code: 4,
            message: "参数不完整"
        });
        return true;
    }
    bannerModel.deleteOne({_id}).then(doc => {
        res.send({
            code: 0,
            message: "数据删除成功"
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