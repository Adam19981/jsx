import request from "./axios.js";


//用户信息
export function getUser(req) {
    return request({
        url: '/api/user',
        method: 'get',
        params: req
    })
}


//动态路由
export function getMenu(req) {
    return request({
        url: '/menu/getMenu',
        method: 'post',
        data: req
    })
}
