import axios from "./axios.js";

export const getMenu = (param) => {
    return axios.request({
        url: '/menu/getMenu',
        method: 'post',
        data: param
    })
}
