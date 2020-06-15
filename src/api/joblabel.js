import request from '../utils/request';

export const labelSelect = query => {
    return request({
        url: '/joblabel/select',
        params: query
    });
};

export const labelDelete = (params) => {
    return request.get('/joblabel/delete', {params})
};
export const labelAdd = (params) => {
    return request.get('/joblabel/add', {params})
};
export const labelUpdate = (params) => {
    return request.get('/joblabel/update', {params})
};
export const labelList = (params) => {
    return request.get('/joblabel/list', {params})
};

// export const getUser = (params) => {
//     return request.get('/user/select', {params})
//   };
