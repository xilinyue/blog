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
    }
}