import axios from 'axios'

const service = axios.create({
	baseURL: "/api",
	timeout: 15000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
		console.log(config);
		config.headers.Authorization = "-4486295200288455283";
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
export default service