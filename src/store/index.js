import Vue from "vue";
import Vuex from "vuex";
import getters from "./getter";
import userStore from "./user";
import layoutStore from "./layout";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		userStore,
		layoutStore
	},
	state: {},
	mutations: {},
	actions: {},
	getters
});
