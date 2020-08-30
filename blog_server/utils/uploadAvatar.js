const multer = require("multer");
const path = require("path");
const userModel = require("../db/userModel");

const express = require('express');
let router = express.Router();

//定义好磁盘存储引擎
let storage = multer.diskStorage({
    //存储的目录
     destination: function(req,file,cb){
         cb(null,path.join(__dirname,"../public/img/avator"));
     },
    //文件名
     filename: function(req,file,cb){
         let {ext} = path.parse(file.originalname);
         let randomName = new Date().getTime() + Math.floor((Math.random() * 99999));
         let fileName = randomName.toString(36) + ext;
         cb(null,fileName);
     }
 });
 
let upload = multer({
    //存储位置
    //dest: path.join(__dirname,"../public/img/avator"),
    storage,
    //上传格式限制
    fileFilter(req,file,cb){
        let {ext} = path.parse(file.originalname);
        cb(null,/^\.jpg|\.jpeg|\.png|\.gif$/.test(ext));
    },
    //限制大小 2M
    limits: {
        fileSize: 1024*1024*2
    }
}).single("file");

router.post("/",(req,res) => {
    upload(req, res,function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            res.send ({
                code: 5,
                msg: '上传失败'
            });
        } else if (err) {
            // 发生错误
            res.send ({
                code: 5,
                msg: '上传失败'
            });
        }
        let image = 'http://localhost:3000/img/avator/' + req.file.filename;
        userModel.updateOne(
            {_id: req.session.userInfo._id},
            {avator: image}
        ).then(data=>{
            //需要更新session存储的数据
            req.session.userInfo.avator = image;
            res.send("OK");
        }).catch(()=>{
            res.sendStatus(500);
        });
    });
})

module.exports =router;
