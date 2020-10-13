import request from '@/utils/request.js'

export function uploadImageApi(data){
	return request({
		url: "/upload/image",
		method: "post",
		data: data,
		headers: {'Content-Type': 'multipart/form-data'}
	})
}