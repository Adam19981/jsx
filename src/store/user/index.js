import {menu,userInfo,login} from "@/api/user";
import filterASyncRoutes from "@/router/kineticRouter";

export default {
    state: {
        info:{},
        token:'',
        menu: []
    },
    mutations: {
        //遍历路由
        setMenu(state, allRouter) {
            state.menu = filterASyncRoutes(allRouter)
        },
        setUserInfo(state,userInfo){
            state.info = userInfo
        },
        setToken(state,token){
            state.token = token
        }
    },
    actions: {
        //获取用户路由
        getUserRouter({commit}, roleId) {
            return new Promise((resolve) => {
                const req = {role_id: roleId}
                menu(req).then(res => {
                    const {data} = res
                    commit('setMenu', data.menu)
                    resolve(data.menu)
                })
            })
        },
        //登录
        userLogin({commit},account){
            return new Promise((resolve)=>{
                const req = {account}
                login(req).then(res=>{
                    const {data} = res
                    const timestamp = new Date().getTime()+60*60*24*1000
                    localStorage.setItem('timestamp',timestamp+'')
                    localStorage.setItem('token',data.token)
                    commit('setToken',data.token)
                    resolve()
                })
            })
        },
        //获取用户信息
        getUserInfo({commit}, token){
            return new Promise((resolve)=>{
                const req = {token}
                userInfo(req).then(res=>{
                    const {data} = res
                    commit('setUserInfo',data)
                    resolve(data)
                })
            })
        }
    }

}