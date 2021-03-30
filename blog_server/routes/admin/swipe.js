const express = require("express");
const swipeModel = require("../../db/swipeModel")
const multer = require("multer")
const cosUpload = require("../../utils/cosUpload");
const fs = require("fs");
const path = require("path");

let router = express.Router();
const upload = multer({dest: "public/img"})
router.use(upload.single("file"));


/**
 * 测试
 */
router.post("/upload",(req,res) => {
    let file = req.file;
    let {ext} = path.parse(file.originalname);
    let randomName = new Date().getTime() + Math.floor((Math.random() * 99999));
    let fileName = randomName.toString(36) + ext;
    cosUpload.upload(fs.createReadStream(req.file.path),"swipe/" + fileName).then(data => {
        // 上传之后删除临时文件
        fs.unlink(req.file.path,(err)=>{
            if(err) console.log(err);
        })
        swipeModel.create({image: "https://" + data.Location}).then(doc => {
            res.send({
                code: 0,
                message: "上传成功",
                data: "https://" + data.Location
            });
        }).catch(err => {
            res.send({
                code: 5,
                message: "服务器错误",
                data: err
            });
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

/**
 * 删除轮播图
 */
 router.delete("/deleteSwipeById",(req,res) => {
    let {_id} = req.query;
    if(!_id){
        res.send({
            code: 4,
            message: "参数不完整"
        });
        return true;
    }
    swipeModel.deleteOne({_id}).then(doc => {
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