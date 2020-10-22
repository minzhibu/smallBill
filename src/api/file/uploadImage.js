import request from '@/utils/request.js'


export function uploadImage(data,config){
	return request({
		url: "/upload/image",
		method: "post",
		data: data,
		config
	});
}



