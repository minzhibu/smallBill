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
							@upload_image="uploadImage"></upload-image>
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
			</div>
		</div>
	</div>
</template>

<script>
	import RoleAuthorityList from '@/components/user/RoleAuthorityList.vue'
	import UploadImage from '@/components/common/UploadImage.vue'
	export default{
		data(){ 
			return {
 				dialogTableVisible: false,
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
			commitDialog(){
				this.dialogTableVisible = false;
			},
			commit(){
				console.log("??");
				this.$emit('user-commit');
			},
			//图片
			uploadImage(image){
				this.$emit("upload-image",image);
			}
		},
		components: {
			RoleAuthorityList,
			UploadImage
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
