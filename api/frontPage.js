// import axios from "./axios.js";
import menuApi from './Data/menu.js'

export const getMenu = (param) => {
    return new Promise(resolve => {
        const data = menuApi.getMenu({
            body: JSON.stringify(param),
            query: JSON.stringify({})
        })
        resolve({data})
    })
    // return axios.request({
    //     url: '/menu/getMenu',
    //     method: 'post',
    //     data: param
    // })
}
