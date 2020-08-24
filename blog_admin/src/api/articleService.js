import request from './index';

export default {
    articleAdd(data) {
        return request.post('/article/addArticle',data);
    }
}