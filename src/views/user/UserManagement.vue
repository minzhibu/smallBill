<template>
	<div
		class="billBackground">
		<user-list
			:users="users"
			:pageObject="pageObject"
			@add-user="addUser"
			@click-page="clickPage"
			@update-user="updateUser"
			@delete-user="deleteUser">
		</user-list>
		<template
			v-if="isShowOperation">
			<user-operation
				:user="user"
				:role="user.roles"
				@upload-image="uploadImage"
				@select-role="selectRole"
				@user-commit="userCommit">
			</user-operation>
		</template>
	</div>
</template>

<script>
	import UserList from '@/components/user/UserList.vue';
	import UserOperation from '@/components/user/UserOperation.vue';
	import {selectList,userInsert,userUpdate,userDelete,selectByIdToRole} from '@/api/user/UserManagementApi.js';	
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
					roles: '',
				},
				selectRoleIds: [],
				isShowOperation: false,
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
				this.selectByPage(page,6);
			},
			addUser(){
				this.isShowOperation = true;
				this.user.id = "";
				this.user.userName = "";
				this.user.accountNumber = "";
				this.user.password = "";
				this.user.imgAddress = "";
				this.user.state = "";
				this.selectRoleIds = [];
				this.user.roles = [];
			},
			//上传图片
			uploadImage(image){
				this.user.imgAddress = image;
			},
			selectRole(selectRoleId){
				this.selectRoleIds = selectRoleId;
			},
			userCommit(){
				if(!this.user.imgAddress){
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
					id: this.user.id,
					userName: this.user.userName,
					accountNumber: this.user.accountNumber,
					password: this.user.password,
					imgAddress: this.user.imgAddress,
					state: this.user.state,
					roleIdS: this.selectRoleIds
				}
				let promise;
				//新建
				if(this.user.id == ''){
					promise = userInsert(data);
				//修改	
				}else{
					promise = userUpdate(this.user.id,data);
				}
				if(promise != null){
					promise.then(response => {
						alert("操作成功");
						this.clickPage(1);
						this.isShowOperation = false;
					})
				}
			},
			//更新
			updateUser(user){
				selectByIdToRole(user.id).then(response => {
						this.isShowOperation = true;
						this.user.roles = response.data.data;
						this.user.id = user.id;
						this.user.userName = user.userName;
						this.user.accountNumber = user.accountNumber;
						this.user.password =user.password;
						this.user.imgAddress = user.imgAddress;
						this.user.state = user.state;
				})
			},
			//删除
			deleteUser(id){
				userDelete(id).then(response => {
					alert("操作成功");
					this.clickPage(1);
				})
			}
		},
		components: {
			UserList,
			UserOperation
		},
		created(){
			this.clickPage(1);
		},
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}
</style>
