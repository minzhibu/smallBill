<template>
	<div class="authority-operating">
		<div class="authority-operating-box">
			<div class="authority-operating-box-row">
				<span class="authority-operating-box-left">
					<span class="authority-operating-box-label">
						<label >
							用户名称:
						</label>
					</span>
					<el-input
					  v-model="user.userName"
						class="authority-operating-box-content">
					</el-input>
				</span>
				<span class="authority-operating-box-right">
					<span class="authority-operating-box-label">
						<label>
							用户账号:
						</label>
					</span>
					<el-input
						v-model="user.accountNumber"
						class="authority-operating-box-content"
						type="number"
						maxlength="1">
					</el-input>
				</span>
			</div>
			<div class="authority-operating-box-row">
				<span class="authority-operating-box-left">
					<span class="authority-operating-box-label">
						<label >
							用户密码:
						</label>
					</span>
					<el-input
					  v-model="user.password"
						class="authority-operating-box-content">
					</el-input>
				</span>
				<span class="authority-operating-box-right">
					<span class="authority-operating-box-label">
						<label>
							用户角色:
						</label>
					</span>
					<span
						@click="openDialog">
						<el-input
							class="authority-operating-box-content"
							:value="userRole"
							@keydown="noInput"
							>
						</el-input>
					</span>
				</span>
			</div>
			<div class="authority-operating-box-row">
				<span class="authority-operating-box-left">
					<span class="authority-operating-box-label">
						<label>
							用户头像:
						</label>
					</span>
					<div style="width: 34%; display: inline-block;">
						<upload-image
							@upload_image="upLoadImage"
							:billUploadImage="user.imgAddress"></upload-image>
					</div>
				</span>
				<span class="authority-operating-box-right">
					<span class="authority-operating-box-label">
						<label >
							用户状态:
						</label>
					</span>
					<el-input
					  v-model="user.state"
						class="authority-operating-box-content">
					</el-input>
				</span>
			</div>
			<div class="authority-operating-box-row">
				<el-row class="bill-button">
					<el-button 
						class="bill-button-style" 
						type="primary"
						@click="commit">
						提交
					</el-button>
					<el-button 
						class="bill-button-style"
						type="info" 
						@click="userAuthorityclear">
						清空
					</el-button>
				</el-row>
				
				<el-dialog
					title="节点权限" 
					width="30%" 
					:visible.sync="dialogTableVisible">
					<div style="height: 400px">
						<user-role-list
							@close-dialog="closeDialog"
							@commit-dialog="commitDialog"
							@commit-select-role="commitSelectRole">
						</user-role-list>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
	import UserRoleList from '@/components/user/UserRoleList.vue'
	import UploadImage from '@/components/common/UploadImage.vue'
	export default{
		data(){ 
			return {
 				dialogTableVisible: false,
				userRole: "",
			}
		},
		methods: {
			//清空
			userAuthorityclear(){
			},
			noInput(){
				
			},
			closeDialog(){
				this.dialogTableVisible = false;
			},
			commitDialog(selectRoleId){
				this.$emit("select-role",selectRoleId);
				this.dialogTableVisible = false;
				//this.dialogTableVisible = false;
			},
			commit(){
				this.$emit('user-commit');
			},
			//图片
			upLoadImage(image){
				console.log(image);
				this.$emit("upload-image",image);
			},
			commitSelectRole(selectRoleNameList){
				console.log(selectRoleNameList);
				this.userRole = "";
				for(let i = 0; i < selectRoleNameList.length; i++){
					this.userRole += selectRoleNameList[i] + ",";
				}
			},
			openDialog(){
				console.log(this.user.id);
				this.dialogTableVisible = true
			}
		},
		components: {
			UploadImage,
			UserRoleList,
		},
		props: {
			user: {
				type: Object,
			}
		},
		computed: {
		},
	}
</script>

<style>
	.authority-operating{
		padding: 0.625rem 18%;
		border-top: solid 0.0625rem #808080;
	}
	.authority-operating-box{
		padding: 1.25rem 9%;
		color: #808080;
		font-size: 16px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 0.625rem;
	}
	.authority-operating-box-content{
		width: 34%;
	}
	.authority-operating-box-left{
	}
	.authority-operating-box-right{
		margin-left: 9%;
	}
	.authority-operating-box-label{
		width: 11%;
		display: inline-block;
	}
	.authority-operating-box-row{
		margin-bottom: 1.25rem;
	}
	.bill-button{
		padding: 0.9375rem 0rem 0rem 40%;
	}
	.bill-button-style{
		width: 16%;
	}
</style>
