<template>
	<div
		class="billBackground">
		<user-list
			:users="users"
			:pageObject="pageObject"
			@click-page="clickPage">
		</user-list>
		<user-operation
			:user="user"
			@upload-image="uploadImage"
			@user-commit="userCommit">
		</user-operation>
	</div>
</template>

<script>
	import UserList from '@/components/user/UserList.vue';
	import UserOperation from '@/components/user/UserOperation.vue';
	import {selectList,userInsert,userUpdate,userDelete} from '@/api/user/UserManagementApi.js';	
	export default{
		data(){
			return {
				users: [],
				pageObject: {},
				user:{
					id: '',
					userName: '',
					accountNumber: '',
					password: '',
					imgAddress: '',
					state: '',
					
				},
				imageFile: '', 
			}
		},
		methods: {
			selectByPage(page,size){
				selectList(page,size).then(response => {
					this.users = response.data.data.questions;
					this.pageObject = response.data.data;
				})
			},
			clickPage(page){
				this.selectByPage(page,2);
			},
			//上传图片
			uploadImage(image){
				console.log(image);
				this.imageFile = image;
			},
			userCommit(){
				if(this.imageFile == "" && this.user.imgAddress){
					alert("请设置用户头像");
					return;
				}
				if(this.user.userName == ""){
					alert("请输入用户名");
					return;
				}
				if(this.user.password == ""){
					alert("请输入密码");
					return;
				}
				if(this.user.state == ""){
					alert("请设置状态");
					return;
				}
				let data = {
					file : this.imageFile,
					id: this.user.id,
					userName: this.user.userName,
					accountNumber: this.user.accountNumber,
					password: this.user.password,
					imgAddress: this.user.imgAddress,
					state: this.user.state,
				}
				let promise;
				//新建
				console.log(data);
				if(this.user.id == ''){
					promise = userInsert(data);
				//修改	
				}else{
					promise = userUpdate(data);
				}
				if(promise != null){
					promise.then(response => {
						console.log(response);
					})
				}
			}
		},
		components: {
			UserList,
			UserOperation
		},
		created(){
			this.selectByPage(1,2);
		},
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}
</style>
