import table from './table/index.vue'
import dynamicBorder from './border/index.vue'


export default {
    install(Vue) {
        Vue.component('table',table)
        Vue.component('dynamicBorder',dynamicBorder)
    }
}
