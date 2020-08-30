import request from './index';

export default {
    listMessageLazy(skip,limit) {
        return request.get("/messages/listMessageLazy",{params: {skip,limit}});
    },
    countMessage() {
        return request.get("/messages/countMessage");
    },
    deleteMessage(_id) {
        return request.delete("/messages/deleteMessage",{params: {_id}});
    },
}