import request from './index';

export default {
    getArticleListLazy(data) {
        return request.get("/articles/getArticleListLazy",{params: data});
    },
    getCurrentArticleTotal(tag) {
        return request.get("/articles/getCurrentArticleTotal",{params: {tag}});
    }
}