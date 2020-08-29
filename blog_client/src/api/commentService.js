import request from './index';

export default {
    submitComment(data) {
        return request.post("/comments/submitComment",data);
    }
}