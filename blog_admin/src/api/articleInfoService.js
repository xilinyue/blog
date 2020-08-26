import request from './index';

export default {
    listTag() {
        return request.get('/articleInfo/listTag');
    },
    addTag(data) {
        return request.post('/articleInfo/addTag', data);
    },
    deleteTag(name){
        console.log(name);
        return request.delete('/articleInfo/deleteTag', {params: {name}});
    }
}