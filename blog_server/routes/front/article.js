const express  = require("express");
const articleModel = require("../../db/articleModel");

let router = express.Router();

/**
 * 懒加载文章数据
 * page 第几页  skip
 * limit 每页条数 limit
 */
router.get("/getArticleListLazy",(req,res) => {
    let {tag, page, num} = req.query;
    if(tag === '全部'){
        tag = '';
    }
    num = num ? parseInt(num) : 5;
    page = page ? (parseInt(page) - 1)*num : 0;  // 默认值
    let options = null;
    if(tag) {
        options = {tag};
    }else{
        options = {}
    }
    articleModel.find(options,{__v: 0,comments: 0},{skip: page, limit: num}).then(docs => {
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
 * 获取当前标签文章的数量
 * tag
 */
router.get("/getCurrentArticleTotal",(req,res) => {
    let {tag} = req.query;
    if(tag === '全部'){
        tag = '';
    }
    let options = null;
    if(tag) {
        options = {tag};
    }else{
        options = {}
    }
    articleModel.find(options).then(docs => {
        let length = docs.length;
        res.send({
            code: 0,
            message: "数据获取成功",
            data: length
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
 * 获取文章详情
 */
router.get("/getArticleDetail",(req,res) => {
    let {_id} = req.query;
    if (!_id) {
        res.send({
            code: 4,
            message: "参数不完整",
        });
        return true;
    }
    articleModel.findOne({_id},{__v: 0}).populate({path: 'comments'}).then(doc => {
        res.send({
            code: 0,
            message: "数据获取成功",
            data: doc
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
 * 文章点赞
 * _id
 */
router.post('/likeArticle',(req,res) => {
    let {_id} = req.body;
    if (!_id) {
        res.send({
            code: 4,
            message: "参数不完整",
        });
        return true;
    }
    articleModel.updateOne({_id},{$inc:{likes:1}}).then(doc => {
        res.send({
            code: 0,
            message: "点赞成功"
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