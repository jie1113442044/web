import request from '../utils/request';

export const login = query => {
    return request({
        url: '/user/login',
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