/**
 * http配置
 */
import axios from 'axios';
import { MessageBox, Indicator } from 'mint-ui';

axios.defaults.timeout = 5000;
// http请求拦截器

axios.interceptors.request.use(
	config => {
		// console.info('config', config);
		//Indicator.open({
		//text: 'Loading...',
		//spinnerType: 'sanke',
		//});
		return config;
	},
	error => {
		//Indicator.close();
		MessageBox.alert('加载超时');
		return Promise.reject(error);
	}
);
// http响应拦截器
axios.interceptors.response.use(
	res => {
		//状态的判断的
		//if (res.status === 200) {
		// 响应成功关闭loading
		Indicator.close();
		return res;
		//}
	},
	error => {
		//Indicator.close();
		MessageBox.alert('加载失败');
		return Promise.reject(error);
	}
);

export default axios;
