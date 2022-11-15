import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./publicStyle/echartsMap/index.scss";
import router from "./router";
import store from "./store";
import { loading, scrollBoard } from "@jiaminghi/data-view";
import modal from "./utlis";
import components from "./components";
import * as echarts from "echarts";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

Vue.use(components);
Vue.use(ElementUI);
Vue.use(loading);
Vue.use(scrollBoard);

Vue.use(modal);

new Vue({
	render: h => h(App),
	store,
	router
}).$mount("#app");
