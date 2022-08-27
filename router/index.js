import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
// import frontPage from '@/views/frontPage/frontPage.vue'
import store from "../store";
Vue.use(VueRouter)



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
    const token =  localStorage.getItem('token')
    if (token){
        if (!store.state.menu.length){
            await store.dispatch('getUserRouter',token)
            console.log(store.state.menu)
            router.addRoute(...store.state.menu)
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
