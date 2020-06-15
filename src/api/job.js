import request from '../utils/request';

export const jobSelect = query => {
    return request({
        url: '/job/select',
        params: query
    });
};

export const jobDelete = (params) => {
    return request.get('/job/delete', {params})
};
export const jobAdd = (params) => {
    return request.get('/job/add', {params})
};
export const jobUpdate = (params) => {
    return request.get('/job/update', {params})
};
export const jobList = (params) => {
    return request.get('/job/list', {params})
};
export const jobTuijian = (params) => {
    return request.get('/job/tuijian', {params})
};
export const labelchart = (params) => {
    return request.get('/job/labelchart', {params})
};
export const areachart = (params) => {
    return request.get('/job/areachart', {params})
};
// export const getUser = (params) => {
//     return request.get('/user/select', {params})
//   };
