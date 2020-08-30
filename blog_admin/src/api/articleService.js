import request from './index';

export default {
    articleAdd(data) {
        return request.post('/article/addArticle',data);
    },
    getArticleListLazy(data) {
        return request.get('/article/getArticleListLazy',{params: data});
    },
    deleteArticleById(_id) {
        return request.delete('/article/deleteArticleById', {params: {_id}});
    },
    articleIsAdminChange(_id,is_recommend) {
        return request.post("/article/articleIsAdminChange", {_id,is_recommend});
    },
    getArticleComment(articleId) {
        return request.get("/article/getArticleComment", {params: {articleId}});
    },
    deleteArticleComment(articleId,commentId) {
        return request.delete("/article/deleteArticleComment", {params: {articleId,commentId}});
    }
}