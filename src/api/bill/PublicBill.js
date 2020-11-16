import request from '@/utils/request.js'

//保存个人账单
export function publicBillInsert(data){
	console.log(data);
	return request({
		url: "/publicBill/",
		method: "post",
		data: data
	})
}



