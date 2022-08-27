import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router/index'
import store from '../store/index'
import '../api/mock.js'
// import http from 'axios'
// Vue.prototype.$http = http
// 高德地图
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '67d8bee1ac1651e1117725a5efe39a47',
    plugin: ["AMap.Autocomplete",
        //输入提示插件
        "AMap.PlaceSearch",
        //POI搜索插件
        "AMap.Scale",
        //右下角缩略图插件 比例尺
        "AMap.OverView",
        //地图鹰眼插件
        "AMap.ToolBar",
        //地图工具条
        "AMap.MapType",
        //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        "AMap.PolyEditor",
        //编辑 折线多，边形
        "AMap.CircleEditor",
        //圆形编辑器插件
        "AMap.Geolocation",
        //定位控件，用来获取和展示用户主机所在的经纬度位置
        'Geocoder'
    ],
    v: '1.4.4'
});

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
    render: h => h(App),
    store,
    router: router,

}).$mount('#app')