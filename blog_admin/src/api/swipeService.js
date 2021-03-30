import request from './index';

export default {
    swipeList() {
        return request.get('/swipes/swipeList');
    },
    addSwipe(data) {
        return request.post('/swipes/addSwipe', data);
    },
    deleteSwipeById(_id){
        return request.delete('/swipes/deleteSwipeById', {params: {_id}});
    }
}