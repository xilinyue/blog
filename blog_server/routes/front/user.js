const e = require('express');
const express = require('express');
const userModel = require("../../db/userModel");
const cryptoUtil = require("../../utils/cryptoUtil");

let router = express.Router();

/**
 * 注册
 * user_name
 * password
 */
router.post("/userRegister",(req,res) => {
    let {user_name,password} = req.body;
    if(!user_name || !password) {
        res.send({
            code: 4,
            message: "参数不完整"
        });
        return true;
    }
    /**查看用户名是否存在 */
    userModel.findOne({user_name}).then(doc1 => {
        if(doc1) {
            // 用户名存在
            res.send({
                code: 1,
                message: "用户名已存在"
            });
        }else{
            // 用户名不存在  加密密码  存储
            password = cryptoUtil.encodePassword(password);
            userModel.create({user_name,password}).then(doc2 => {
                res.send({
                    code: 0,
                    message: "注册成功"
                })
            })
        }
    }).catch(err => {
        res.send({
            code: 5,
            message: "服务器错误",
            data: err
        });
    });

});

/**
 * 登录
 * username
 * password
 */
router.post('/userLogin',(req,res) => {
    let {user_name,password} = req.body;
    if(!user_name || !password) {
        res.send({
            code: 4,
            message: '参数不完整'
        });
        return true;
    }
    // 先通过userName查看是否有该用户数据
    userModel.findOne({user_name}).then(doc => {
        if(doc){
            // 有该用户 对比密码是否正确
            if(password === cryptoUtil.decodePassword(doc.password)){
                // 密码正确 判断是否是admin
                let userInfo = {
                    _id: doc._id,
                    userName: doc.user_name,
                    avator: doc.avator
                };
                if(doc.is_admin){
                    // 存储role
                    userInfo.role = 'admin'
                }else{
                    userInfo.role = 'user'
                }
                req.session.userInfo = userInfo;
                res.send({
                    code: 0,
                    message: "登录成功",
                    data: userInfo
                });
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
 * 用户修改密码或者用户名
 * _id: _id,根据id修改
 * type: password or user_name
 * passWordOrUsername
 */
router.post("/editPasswordOrUserName",(req,res) => {
    let {_id,type,passWordOrUsername} = req.body;
    if (!_id || !type || !passWordOrUsername) {
        res.send({
            code: 4,
            message: "参数不完整"
        });
    }
    let docs = null;
    if(type === "password"){
        passWordOrUsername = cryptoUtil.encodePassword(passWordOrUsername);
        docs = {"password": passWordOrUsername};
    }else{
        docs = {"user_name": passWordOrUsername};
    }
    console.log(_id,type,passWordOrUsername);
    userModel.updateOne({_id},docs).then(doc => {
        delete req.session.userInfo;  // 清除session
        res.send({
            code: 0,
            message: "修改成功",
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

module.exports = router;