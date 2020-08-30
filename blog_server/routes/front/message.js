const express = require("express");
const messageModel = require("../../db/messageModel")

let router = express.Router();

/**
 * 添加留言
 * user_name 留言用户名
 * avator 留言用户头像
 * content 建议使用html格式内容
 * create_time留言时间
 */
router.post("/submitMessage",(req,res) => {
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
    messageModel.create({
        user_name: userInfo.userName,
        avator: userInfo.avator,
        content
    }).then(doc => {
        res.send({
            code: 0,
            message: "留言成功"
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