import {getMenu} from "../../api/frontPage";
import filterASyncRoutes from "../../router/kineticRouter";

export default {
    state: {
        token: '',
        menu: []
    },
    mutations: {
        //遍历路由
        setMenu(state, allRouter) {
            state.menu = filterASyncRoutes(allRouter)
        },
    },
    actions: {
        //获取用户路由
        getUserRouter({commit}, userId) {
            return new Promise((resolve) => {
                const req = {userId: userId}
                getMenu(req).then(response => {
                    const {data} = response
                    console.log(data.menu)
                    commit('setMenu', data.menu)
                    resolve(response)
                })
            })
        }
    }

}