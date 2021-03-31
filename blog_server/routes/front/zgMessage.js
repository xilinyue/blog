const express = require("express");
const zgMessageModel = require("../../db/zgMessageModel")

let router = express.Router();

/**
 * 添加留言
 * user 留言用户_id
 * content 建议使用html格式内容
 * create_time留言时间
 */
router.post("/addZgMessage",(req,res) => {
    let {content} = req.body;
    let userInfo = req.session.userInfo;
    // 参数完整性
    if (!content) {
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
    // 添加到messages中
    zgMessageModel.create({
        user: userInfo._id,
        content
    }).then(doc => {
        res.send({
            code: 0,
            message: "爱心留言成功"
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
 * 懒加载留言数据
 * skip,limit
 */
router.get("/listZgMessage", (req,res) => {
    let {skip,limit} = req.query;
    limit = limit ? parseInt(limit) : 5;
    skip = skip ? (parseInt(skip) - 1)*limit : 0;
    zgMessageModel.find({},{__v: 0},{skip,limit,sort: {create_time: -1}})
        .populate('user',{_id: 1, user_name: 1,avator: 1})
        .then(docs => {
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
router.get("/countZgMessage", (req,res) => {
    zgMessageModel.find({}).then(docs => {
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

module.exports = router;