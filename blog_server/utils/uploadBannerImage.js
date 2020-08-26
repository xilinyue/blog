const multer = require("multer");
const path = require("path");

const express = require('express');
let router = express.Router();

//定义好磁盘存储引擎
let storage = multer.diskStorage({
    //存储的目录
     destination: function(req,file,cb){
         cb(null,path.join(__dirname,"../public/img/banner"));
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
    //dest: path.join(__dirname,"../public/img/banner"),
    storage,
    //上传格式限制
    fileFilter(req,file,cb){
        let {ext} = path.parse(file.originalname);
        cb(null,/^\.jpg|\.jpeg|\.png|\.gif$/.test(ext));
    },
    //限制大小 4M
    limits: {
        fileSize: 4*1024*1024
    }
}).single("file");

router.post("/",(req,res) => {
    console.log('afd');
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
        res.send ({
            code: 0,
            message: '上传成功',
            imgSrc: 'http://localhost:3000/img/banner' + req.file.filename
        });
    });
})

module.exports =router;