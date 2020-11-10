import request from '@/utils/request.js'

//保存个人账单
export function personalBillInsert(data){
	console.log(data);
	return request({
		url: "/personalBill/",
		method: "post",
		data: data
	})
}



