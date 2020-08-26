const articleModel = require("../../db/articleModel");
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
            res.send({
                code: 0,
                message: "文章上传成功"
            });
        }).catch(err => {
            res.send({
                code: 5,
                message: "服务器错误",
                data: err
            });
        })
});

module.exports = router;