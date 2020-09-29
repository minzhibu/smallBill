import request from '@/utils/request'
export function jurisdictionList(){
	return request({
		url: "/jurisdictionInformation/",
		method: "get",
	})
}

export function jurisdictionInsert(data){
	return request({
		url: "/jurisdictionInformation/",
		method: "post",
		data: data
	})
}

export function jurisdictionUpdate(id,data){
	return request({
		url: "/jurisdictionInformation/" + id,
		method: "put",
		data: data
	})
}

export function jurisdictionDelete(id){
	return request({
		url: "/jurisdictionInformation/" + id,
		method: "delete"
	})
}