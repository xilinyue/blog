const express = require("express");
const messageModel = require("../../db/messageModel")

let router = express.Router();

/**
 * 懒加载留言数据
 * skip,limit
 */
router.get("/listMessageLazy", (req,res) => {
    let {skip,limit} = req.query;
    limit = limit ? parseInt(limit) : 5;
    skip = skip ? (parseInt(skip) - 1)*limit : 0;
    messageModel.find({},{__v: 0},{skip,limit,sort: {create_time: -1}}).then(docs => {
        res.send({
            code: 0,
            message: '数据获取成功',
            data: docs
        });
    }).catch(err => {
        res.send({
            code: 5,
            message: '服务器错误',
            data: err
        });
    });
});

/**
 * 留言数量
 */
router.get("/countMessage", (req,res) => {
    messageModel.find({}).then(docs => {
        res.send({
            code: 0,
            message: '数据获取成功',
            data: docs.length
        });
    }).catch(err => {
        res.send({
            code: 5,
            message: '服务器错误',
            data: err
        });
    });
});

/**
 * 删除留言
 */
router.delete("/deleteMessage", (req,res) => {
    let {_id} = req.query;
    if (!_id) {
        res.send({
            code: 4,
            message: "参数不完整"
        });
        return true;
    }
    messageModel.deleteOne({_id}).then(doc => {
        res.send({
            code: 0,
            message: '数据删除成功'
        });
    }).catch(err => {
        res.send({
            code: 5,
            message: '服务器错误',
            data: err
        });
    });
});

module.exports = router;