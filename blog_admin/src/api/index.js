import axios from 'axios';
// import { Message, MessageBox } from 'element-ui'

// axios.defaults.baseURL = 'http://47.104.155.124:3001/api'; //默认访问地址
axios.defaults.baseURL = 'http://localhost:3000/api/admin';
axios.defaults.withCredentials = true;  //跨域允许携带cookies
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //设置post请求格式

// response 拦截器
axios.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        return response.data;
    },
    error => {
        console.log(error);
    });

export default axios;