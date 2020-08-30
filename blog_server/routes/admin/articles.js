const articleModel = require("../../db/articleModel");
const articleInfoModel = require("../../db/articleInfoModel");
const commentModel = require("../../db/commentModel");
const express = require("express");

let router = express.Router();

/**
 * 添加文章接口
 * title文章标题
 * content文章内容
 * summary文章摘要
 * image列表展示图片 
 * is_recommend true or false 是否置顶 参数不必须
 */
router.post("/addArticle", (req,res) => {
    let {title, tag, content, summary, image, isRecommend} = req.body;
    if(!title || !content || !summary || !image || !tag){
        res.send({
            code: 4,
            message: "必传参数不完整"
        });
        return true;
    }
    articleModel.create({title, content, tag, summary, image, is_recommend: isRecommend})
        .then(doc => {
            // 更新tags中的num
            articleInfoModel.updateOne({},{$inc:{num:1}}).then(doc => {
                res.send({
                    code: 0,
                    message: "文章上传成功"
                });
            })
        }).catch(err => {
            res.send({
                code: 5,
                message: "服务器错误",
                data: err
            });
        })
});

/**
 * 懒加载文章数据
 * page 第几页  skip
 * limit 每页条数
 */
router.get("/getArticleListLazy",(req,res) => {
    let {tag, page, num} = req.query;
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
 * 根据文章_id删除文章
 * _id
 */
router.delete('/deleteArticleById',(req,res) => {
    let {_id} = req.query;
    articleModel.deleteOne({_id}).then(doc => {
        // 更新tags中的num
        articleInfoModel.updateOne({},{$inc:{num: -1}}).then(doc => {
            res.send({
                code: 0,
                message: "删除成功",
            });
        });
    }).catch(err => {
        res.send({
            code: 5,
            message: "服务器错误",
            data: err
        });
    })
});

/**
 * 根据文章_id修改文章的is_admin值
 * _id
 * is_admin
 */
router.post("/articleIsAdminChange",(req,res) => {
    let {_id,is_recommend} = req.body;
    if (!_id) {
        res.send({
            code: 4,
            message: "参数不完整"
        });
        return true;
    }
    articleModel.updateOne({_id}, {is_recommend}).then(doc => {
        res.send({
            code: 0,
            message: "修改成功",
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
 * 根据文章id获取文章评论列表
 * articleId
 */
router.get("/getArticleComment",(req,res) => {
    let {articleId} = req.query;
    if (articleId.length !== 24) {
        res.send({
            code: 4,
            message: "参数错误"
        });
        return true;
    }
    articleModel.findOne({_id: articleId},{comments: 1}).populate({path: 'comments'}).then(doc => {
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
 * 根据文章评论id删除文章评论
 * commentId
 * articleId
 */
router.delete("/deleteArticleComment",(req,res) => {
    let {commentId,articleId} = req.query;
    if (commentId.length !== 24 || articleId.length !== 24) {
        res.send({
            code: 4,
            message: "参数错误"
        });
        return true;
    }
    /**首先删除comments表中到数据，然后删除文章中的comments中到id */
    commentModel.deleteOne({_id: commentId}).then(doc1 => {
        articleModel.updateOne({_id: articleId},{$pull:{comments: commentId}}).then(doc2 => {
            res.send({
                code: 0,
                message: "删除成功"
            })
        });
    }).catch(err => {
        res.send({
            code: 5,
            message: "服务器错误",
            data: err
        });
    });
    
})

module.exports = router;