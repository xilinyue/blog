const articleModel = require("../../db/articleModel");
const articleInfoModel = require("../../db/articleInfoModel");
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
})

module.exports = router;