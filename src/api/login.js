import request from '@/utils/request.js'

export function loginToUser(data){
	console.log(data);
	return request({
		url: "/login/user",
		method: "post",
		data: data
	})
}
export function loginToToken(){
	return request({
		url: "/login/token",
		method: "post"
	})
}
export function selectUserIdToAuthority(data){
	return request({
		url: "/user/selectUserIdToAuthority",
		method: "post",
		data: data
	})
}