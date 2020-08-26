const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const logger = require("morgan");
// 数据库连接
const mongoose = require("./db/index.js");

//session
const session = require('express-session');
const sessionMongo = require("connect-mongo")(session);

// // APP 实例
let app = express();
app.use(logger('dev'));
// 可以解析前端传过来到参数  req.body req.params req.query
app.use(express.json())
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser);
// // 设置静态路径
app.use(express.static(path.join(__dirname,'public')));

// // session的使用
// app.use(session({
//     secret: "blog",  //密钥，一个字符串，用于加密，可以随便写
//     cookie: {maxAge: 60*60*1000},  //给前端设置的cookie的有效时长，单位毫秒
//     rolling: true,  //每次用户和后端交互时，刷新cookie的有效期
//     resave: false,  //是否每次重新存储session
//     saveUninitialized: false,  //初始化
//     //将session存储到数据库中
//     store: new sessionMongo({
//         url: "mongodb://localhost:27017/blog"
//     })
// }));

//设置允许跨域访问
app.use((req,res,next) => {
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json;charset=utf-8'
    });
    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
    }else{
        next();
    }
});

// 各个路由
// 1. admin
app.use('/api/admin/user', require("./routes/admin/users"));
app.use('/api/admin/article', require("./routes/admin/articles"));
app.use('/api/admin/articleInfo', require("./routes/admin/articleInfo"));
app.use('/api/uploadArticleFace',require('./utils/uploadArticleFace'));
// app.get('/test',(req,res) => {
//     res.send('sadf');
// });
// 2. front

module.exports = app;

/**
 * 0 请求成功
 * 3 其他错误
 * 4 参数错误
 * 5 服务器错误
*/