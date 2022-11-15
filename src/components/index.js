import MTable from "./table/index.vue";
import dynamicBorder from "./border/index.vue";
import echarts from "./echarts/index.vue";

export default {
	install(Vue) {
		Vue.component("MTable", MTable);
		Vue.component("dynamicBorder", dynamicBorder);
		Vue.component("echarts", echarts);
	}
};
