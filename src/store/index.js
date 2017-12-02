// 组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';

import song from './modules/song';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		song,
	},
	strict: process.env.NODE_ENV !== 'production', // 严格模式
});
