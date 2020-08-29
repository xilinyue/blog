const express = require("express");
const commentModel = require("../../db/commentModel");
const articleModel = require("../../db/articleModel");

let router = express.Router();

/**
 * 上传评论
 * article_id 文章id  评论上传后根据文章_id存储comments
 * value 评论内容
 * userInfo 用户相关信息从req.session中获取
 */
router.post("/submitComment",(req,res) => {
    let {article_id, value} = req.body;
    let userInfo = req.session.userInfo;
    // 参数完整性
    if (!article_id || !value) {
        res.send({
            code: 4,
            message: '参数不完整'
        });
        return true;
    }
    //判断用户是否登录
    if (!userInfo){
        res.send({
            code: 1,
            message: '用户未登录'
        });
        return true;
    }
    // 添加到comments中
    commentModel.create({
        user_name: userInfo.userName,
        avator: userInfo.avator,
        content: value
    }).then(doc1 => {
        articleModel.updateOne({_id: article_id},{$push:{comments: doc1._id}}).then(doc2 => {
            res.send({
                code: 0,
                message: "评论成功"
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

module.exports = router;