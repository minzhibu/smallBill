<template>
	<div>
		<div class="bill-login-body">
				<i 
					style="font-size: 4em; color: #409eff;"	
					class="el-icon-edit-outline">
				</i><br>
				<span
					style="font-size: 2em; color: #409eff;">
					账单管理系统
				</span>
			 <el-input  
				placeholder="请输入账号" 
				v-model="accountNumber"
				style="margin-top: 25px;">
					<template slot="prepend">
						<i class="el-icon-user-solid"></i>
					</template>
				</el-input>
			 <el-input 
				placeholder="请输入密码" 
				v-model="password" show-password
				style="margin-top: 25px;">
					<template slot="prepend">
						<i class="el-icon-lock"></i>
					</template>
				</el-input>
				<el-button
					style="margin-top: 25px;"
					@click="login">登录
				</el-button>
		</div>
		<img data-v-c0dcf7e2="" src="../assets/login_center_bg.5307896.png" class="login-center-layout">
	</div>
</template>

<script>
	import {loginToUser} from '@/api/login.js'
	import {setToken} from '@/utils/auth.js'
	export default{
		data(){
			return {
				accountNumber: "",
				password: ""
			}
		},
		methods: {
			login(){
				if(this.accountNumber != "" && this.password != ""){
					let data = {
						accountNumber : this.accountNumber,
						password: this.password
					}
					loginToUser(data).then(response => {
						if(response.data.code == '401'){
							alert("账号密码错误!");
						}else if(response.data.code == '200'){
							setToken(response.data.data);
							this.$router.push({path : 'home'});
						}
					})
				}
			}
		}
	}
</script>

<style>
	.bill-login-body{
		position: absolute;
		left: 0;
		right: 0;
		width: 360px;
		margin: 140px auto;
		border-top: 10px solid #409eff;
		text-align: center;
		border-radius: 0.3125rem;
		background: white;
		padding-bottom: 40px;
		padding: 30px;
	}
	.login-center-layout{
		background: #409eff;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		margin-top: 200px;
	}
</style>
