import request from './index';

export default {
    login(userName,password) {
        return request.post('/users/login',{userName,password});
    },
    ifLogin() {
        return request.get('/users/ifLogin');
    },
    userList() {
        return request.get('/users/userList');
    }
}