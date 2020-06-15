import request from '../utils/request';

export const userAdd = query => {
    return request({
        url: '/user/add',
        method: 'get',
        params: query
    });
};
export const getUser = query => {
    return request({
        url: '/user/select',
        method: 'get',
        params: query
    });
};
export const deleteUser = query => {
    return request({
        url: '/user/delete',
        method: 'get',
        params: query
    });
};
export const updateUser = query => {
    return request({
        url: '/user/update',
        method: 'get',
        params: query
    });
};
export const listUser = query => {
    return request({
        url: '/user/list',
        method: 'get',
        params: query
    });
};



// export const getUser = (params) => {
//     return request.get('/user/select', {params})
//   };

//   export const areaPageList = (params) => {
//       return fetch.get('/enterprise/area/page/list', {
//           params
//       })
//   };