import axios from 'axios'
import router from '@/router/index.js'
import {getToken} from '@/utils/auth.js'

const service = axios.create({
	baseURL: "/api",
	timeout: 15000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
		if(config.url.indexOf('login') != -1){
			return config;
		}
		config.headers.Authorization = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
service.interceptors.response.use(response => {
	if(response.config.url.indexOf('login')){
		return response;
	}
	console.log(response.data.code);
	if(response.data.code == "401"){
		alert("当前账号未登录!")
		router.push({path: '/login'});
	}
	return response;
})
export default service