import Vue from 'vue'
import Vuex from 'vuex'
import {getMenu} from "../api/frontPage";
import filterASyncRoutes from "../router/kineticRouter";
Vue.use(Vuex)
const state = {
    breadcrumbList: [],
    isCollapse:false,
    token: '',
    menu: []
}


const mutations = {
    //切换侧边栏
    changeIsCollapse(state) {
        state.isCollapse = !state.isCollapse
    },
    //設置路由
    setMenu(state, allRouter) {
        state.menu = filterASyncRoutes(allRouter)
    },
    //增加面包屑
    addBreadcrumb(state, val) {
        const result = state.breadcrumbList.findIndex((item) => {
            return item.name === val.name
        })
        if (result === -1) {
            state.breadcrumbList.push(val)
        }

    },
    //关闭面包屑
    closeBreadcrumb(state, val) {
        const result = state.breadcrumbList.findIndex((item) => {
            return item.name === val.name
        })
        state.breadcrumbList.splice(result, 1)

    },
}



const actions = {
    getUserRouter({commit},userId){
        return new Promise(  (resolve)=>{
            const req = {userId:userId}
            getMenu(req).then(response=>{
                const { data } =response
                commit('setMenu',data.data.menu)
                resolve(response)
            })

        })
    }
}



export default new Vuex.Store({
    actions,
    mutations,
    state,
})