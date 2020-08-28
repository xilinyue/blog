import request from './index';

export default {
    getBannerList() {
        return request.get('/banners/bannerList');
    }
}