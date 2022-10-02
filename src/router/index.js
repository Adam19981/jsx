import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
Vue.use(VueRouter)

export const loginRouter = [{
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/login/index.vue')
}]

const router = new VueRouter({
    routes: loginRouter,
    mode: 'history'
})

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


function getFirstTabs(menu){ //获取tabs的默认第一栏
    let  obj = {}
    for (let i = 0 ; i<menu.length ; i++){
        if (!menu[i].hidden){
            obj = menu[i]
            break
        }
    }
    return obj;
}
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
                const menu =  await store.dispatch('getUserRouter', info.role_id)
                store.state.layoutStore.breadcrumbList=[getFirstTabs(menu)]
                menu.forEach(item => {
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
