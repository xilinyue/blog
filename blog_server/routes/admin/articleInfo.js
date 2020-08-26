const articleInfoModel = require("../../db/articleInfoModel");
const express = require("express");
const { query } = require("express");

let router = express.Router();

/**
 * 添加文章标签
 * name 名称
 */
router.post("/addTag",(req,res) => {
    let {name} = req.body;
    if(!name) {
        res.send({
            code: 4,
            message: '名称不能为空'
        });
        return true;
    }
    articleInfoModel.findOne({}).then(data => {
        let index = data.tags.indexOf(name) + 1;
        if (index) {
            res.send({
                code: 1,
                message: '该tag已经存在'
            });
        }else{
            articleInfoModel.updateOne({},{$push: {tags: name}}).then(data1 => {
                res.send({
                    code: 0,
                    message: '添加成功'
                });
            });
        }
    }).catch(err => {
        res.send({
            code: 5,
            message: '服务器错误'
        });
    });
});

/**
 * 获取文章标签接口
 */
router.get("/listTag", (req,res) => {
    articleInfoModel.find({},{__v: 0,_id: 0}).then(docs => {
        res.send({
            code: 0,
            message: '获取数据成功',
            data: docs[0]
        })
    }).catch(err => {
        res.send({
            code: 5,
            message: '服务器错误',
            data: err
        })
    });
});

/**
 * 删除文章标签接口
 */
router.delete('/deleteTag',(req,res) => {
    let {name} = req.query;
    console.log(name);
    articleInfoModel.updateOne({},{$pull: {tags: name}}).then(docs => {
        res.send({
            code: 0,
            message: '删除数据成功'
        })
    }).catch(err => {
        res.send({
            code: 5,
            message: '服务器错误',
            data: err
        })
    });
})

module.exports = router;