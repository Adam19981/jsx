import request from "./axios.js";



export function getConsumeList(req){
    return request({
        url:'/api/consumeList',
        method: 'get',
        params: req
    })
}