import request from '@/utils/request.js'

export function loginToUser(data){
	console.log(data);
	return request({
		url: "/login/user",
		method: "post",
		data: data
	})
}