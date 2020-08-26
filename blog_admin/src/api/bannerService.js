import request from './index';

export default {
    bannerList() {
        return request.get('/banners/bannerList');
    },
    addBanner(data) {
        return request.post('/banners/addBanner', data);
    },
    deleteBannerById(_id){
        return request.delete('/banners/deleteBannerById', {params: {_id}});
    }
}