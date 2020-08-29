import request from './index';

export default {
    userRegister(data) {
        return request.post("/users/userRegister",data);
    },
    userLogin(data) {
        return request.post("/users/userLogin",data);
    },
    ifLogin() {
        return request.get("/users/ifLogin");
    },
    logout() {
        return request.post("/users/logout");
    }
}