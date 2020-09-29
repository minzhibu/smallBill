import request from '@/utils/request.js'

//分页查询
export function selectList(page, size){
	return request({
		url: '/role/'+page+'/'+size,
		method: 'get',
	})
}
//添加
export function roleInsert(data){
	console.log(data);
	return request({
		url: '/role/',
		method: 'post',
		data: data
	})
}
//修改
export function roleUpdate(data){
	return request({
		url: '/role/',
		method: 'put',
		data: data
	})
}
//删除
export function roleDelete(id){
	return request({
		url: '/role/' + id,
		method: 'delete',
	})
}

export function selectByIdToJurisdiction(id){
	return request({
		url: '/role/' + id,
		method: 'get',
	})
}