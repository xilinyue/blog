import request from './index';

export default {
    listTag() {
        return request.get("/articleInfo/listTag");
    }
}