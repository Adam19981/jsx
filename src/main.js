import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router/index'
import store from '../store/index'
import echartsStyle from './publicStyle/echartsMap/index.scss'
import  dataV from '@jiaminghi/data-view'
import modal from './publicMethod'
import components from "./components";
import '../api/mock.js'
import * as echarts from 'echarts';
Vue.config.productionTip = false
Vue.use(components)
Vue.use(ElementUI)
Vue.use(dataV)

Vue.use(modal)
Vue.use(echartsStyle)
Vue.prototype.$echarts =  echarts
new Vue({
    render: h => h(App),
    store,
    router: router,

}).$mount('#app')