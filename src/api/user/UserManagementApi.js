import request from '@/utils/request.js'

//分页查询
export function selectList(page, size){
	return request({
		url: '/user/'+page+'/'+size,
		method: 'get',
	})
}
//添加
export function userInsert(data){
	console.log(data);
	return request({
		url: '/user/',
		method: 'post',
		data: data,
	})
}
//修改
export function userUpdate(id,data){
	console.log(data);
	return request({
		url: '/user/'+id,
		method: 'put',
		data: data
	})
}
//删除
export function userDelete(id){
	return request({
		url: '/user/' + id,
		method: 'delete',
	})
}