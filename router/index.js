import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import store from "../store";
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err=>err)
}


export const loginRouter = [ {
    path: '/login',
    name: 'login',
    component: login
}]

const router =  new VueRouter({
    routes:loginRouter,
    mode:'history'
})




router.beforeEach(async (to, form, next) => {
    console.log(to)
    const token =  localStorage.getItem('token')
    if (token){
        if (!store.state.menu.length){
            await store.dispatch('getUserRouter',token)
            console.log(store.state.menu)
            store.state.menu.forEach(item=>{
                router.addRoute({...item})
            })
            console.log(router)
            next({...to, replace: true })
        }else{
            next()
        }

    }else{
        if (to.name==='login'){
            next()
        }else{
            next({name:'login'})
        }
    }

})


export default router
