import request from './index';

export default {
    submitMessage(content) {
        return request.post("/messages/submitMessage",{content});
    }
}