# 个人博客

出于个人兴趣，重新构建一个个人博客，前端主要使用VUE，后端使用node + elementUI。

项目分为三个模块，分别是：

- blog_server——后端
- blog_client——前端
- blog_admin——后台管理系统

### 一、blog_server架构

###### 1.app.js

允许跨域设置

```js
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
```

###### 2.db——数据库

**因为使用同一个后台，只要是上传图片都使用相对路径存储。**

- users——用户表

| _id         | mongodb数据库数据唯一标识  |
| ----------- | -------------------------- |
| user_name   | 用户名                     |
| password    | 密码——加密                 |
| create_time | 注册时间                   |
| is_admin    | true \|\| false 是否管理员 |
| avator      | 头像图片地址               |

- tag——文章标签

| _id  | mongodb数据库数据唯一标识 |
| ---- | ------------------------- |
| tags | 数组，存储的是标签        |
| num  | 文章总数目                |

- articles——文章表

| _id          | mongodb数据库数据唯一标识          |
| ------------ | ---------------------------------- |
| title        | 文章标题                           |
| content      | 文章内容，使用vue-quill-editor编辑 |
| summary      | 文章摘要                           |
| create_time  | 书写时间                           |
| update_time  | 更新时间                           |
| likes        | 点赞数                             |
| image        | 列表展示图片                       |
| comments     | _id数组，与comments表关联          |
| is_recommend | true or false 是否置顶             |

- commetns——文章评论表

| _id         | mongodb数据库数据唯一标识 |
| ----------- | ------------------------- |
| user_name   | 评论用户名                |
| avator      | 评论用户头像地址          |
| content     | 评论内容，简单的文字内容  |
| create_time | 创建时间                  |

- banners——轮播图

| _id   | mongodb数据库数据唯一标识 |
| ----- | ------------------------- |
| iamge | 图片地址                  |
| title | 标题                      |
| url   | 文章_id                   |

- message——留言

| _id         | mongodb数据库数据唯一标识 |
| ----------- | ------------------------- |
| user_name   | 留言用户名                |
| avator      | 留言用户头像              |
| content     | 建议使用html格式内容      |
| create_time | 留言时间                  |

###### 3.routes——controller

1. front

   user(注册，登录),article(列表展示，文章详情页，文章评论，banner的获取),message（用户留言）

2. admin

   user(管理员登录)，article（列表展示，文章编辑，添加文章，文章评论管理，）banner（banner管理），message（留言管理）

##### 4.图片要求

轮播图 951*350

文章表现图：280*200

 

