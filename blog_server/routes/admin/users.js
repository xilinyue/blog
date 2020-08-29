const userModel = require("../../db/userModel");
const express = require("express");
const { decodePassword } = require("../../utils/cryptoUtil");

let router = express.Router();

/**
 * 登录
 * username
 * password
 */
router.post('/login',(req,res) => {
    let {userName,password} = req.body;
    if(!userName || !password) {
        res.send({
            code: 4,
            message: '参数不完整'
        });
        return true;
    }
    // 先通过userName查看是否有该用户数据
    userModel.findOne({user_name: userName}).then(doc => {
        if(doc){
            // 有该用户 对比密码是否正确
            if(password === decodePassword(doc.password)){
                // 密码正确 判断是否是admin
                if(doc.is_admin){
                    // 是  
                    // 将userInfo存储到session中
                    let userInfo = {
                        _id: doc._id,
                        userName: doc.user_name,
                        avator: doc.avator,
                        role: 'admin'
                    };
                    req.session.userInfo = userInfo;
                    res.send({
                        code: 0,
                        message: "登录成功",
                        data: userInfo
                    });
                }else{
                    res.send({
                        code: 4,
                        message: "该用户没有管理员权限"
                    });
                }  
            }else{
                res.send({
                    code: 4,
                    message: "密码错误"
                });
            }
        }else{
            // 没有该用户
            res.send({
                code: 4,
                message: "用户不存在"
            })
        }
    });
});

/**
 * 获取用户登录状态
 */
router.get("/ifLogin",(req,res) => {
    let userInfo = req.session.userInfo;
    if(userInfo) {
        res.send({
            code: 0,
            message: '已登录',
            data: userInfo
        });
    }else{
        res.send({
            code: 1,
            message: '未登录'
        });
    }
});

/**
 * 用户退出登录
 */
router.post('/logout',(req,res) => {
    let userInfo = req.session.userInfo;
    if(!userInfo) {
        res.send({
            code: 1,
            message: '用户未登录'
        });
        return false;
    }else{
        delete req.session.userInfo;
        res.send({
            code: 0,
            message: '退出登录成功'
        });
    }
});

/**
 * 获取用户列表
 */
router.get("/userList", (req,res) => {
    userModel.find({},{__v: 0,password: 0}).then(docs => {
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

module.exports = router;