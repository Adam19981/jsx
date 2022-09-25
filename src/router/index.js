import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import store from "@/store";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export const loginRouter = [{
    path: '/login',
    name: 'login',
    component: login
}]

const router = new VueRouter({
    routes: loginRouter,
    mode: 'history'
})


router.beforeEach(async (to, form, next) => {
    if (to.name === 'login') {
        next()
    } else {
        const token = localStorage.getItem('token')
        const timestamp = Number(localStorage.getItem('timestamp')) //登录时存的时间戳
        const nowTimeStamp = new Date().getTime() //当前时间戳
        if (token && nowTimeStamp < timestamp) {
            if (store.getters.info.role_id) {
                next()
            } else {
                const info = await store.dispatch('getUserInfo', token)
                await store.dispatch('getUserRouter', info.role_id)
                store.getters.menu.forEach(item => {
                    router.addRoute({...item})
                })
                next({...to, replace: true})
            }
        } else {
            next({name: 'login'})
        }
    }

})


export default router
