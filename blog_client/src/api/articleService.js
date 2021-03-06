import request from './index';

export default {
    getArticleListLazy(data) {
        return request.get("/articles/getArticleListLazy",{params: data});
    },
    getCurrentArticleTotal(tag) {
        return request.get("/articles/getCurrentArticleTotal",{params: {tag}});
    },
    getArticleDetail(_id) {
        return request.get("/articles/getArticleDetail", {params: {_id}});
    },
    likeArticle(_id) {
        return request.post("/articles/likeArticle", {_id});
    }
}