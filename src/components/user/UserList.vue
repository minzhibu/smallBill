<template>
	<div>
		<div class="box">
			<div class="box-header">
				<span>用户管理</span>
			</div>
			<div class="box-body">
				<table class="box-table" >
					<tr>
						<th width="10%">用户名称</th>
						<th width="10%">用户登录名</th>
						<th width="10%">用户头像</th>
						<th width="10%">用户状态</th>
						<th width="10%">系统默认</th>
						<th width="10%">功能
							<el-button
								type="primary" 
								plain size="small"
								@click.stop="addUser(-1)">
								增加用户
							</el-button>
						</th>
					</tr>
					<tr v-for="(user,index) in users" :key="index">
						<td>
							{{user.userName}}
						</td>
						<td>
							{{user.accountNumber}}
						</td>
						<td>
							{{user.imgAddress}}
						</td>
						<td>
							{{user.state}}
						</td>
						<td>
							{{user.defaultUser}}
						</td>
						<td>
							<el-button
								type="success" 
								plain size="small"
								@click.stop="updateUser(user)">
								修改
							</el-button>
							<el-button 
								type="danger" 
								plain size="small"
								@click.stop="deleteUser(user.id)">
								删除
							</el-button>
						</td>
					</tr>
				</table>
			</div>
			<!-- 引入分页 -->
			<bill-page 
			 :pageObject="pageObject"
				class="bill-role-page"
				@click-page="clickPage">
			</bill-page>
		</div>
	</div>
</template>

<script>
	import BillPage from '@/components/common/BillPage.vue';
	export default{
		data(){
			return {
			}
		},
		methods: {
			//修改
			updateUser(user){
				this.$emit('update-user',user);
			},
			//刪除
			deleteUser(id){
				this.$emit('delete-user',id);
			},
			//分页查询
			clickPage(page){
				this.$emit("click-page",page);
			},
			//保存
			addUser(){
				this.$emit("add-user");
			}
		},
		components: {
			BillPage,
		},
		mounted(){
		},
		props: { 
			users: {
				type: Array
			},
			pageObject: {
				type: Object
			}
		}
	}
</script>

<style>
	.box{
		position: relative; 
		border-radius: 3px;
		overflow: auto;
		background: #ffffff;
		border-top: 3px solid #d2d6de;
		margin-bottom: 1.5625rem;
		width: 100%;
		box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.1);
		padding-bottom: 15px;
	}
	.box-header{
		padding: 0.9375rem;
		font-size: 1.125rem;
	}
	.box-body{
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius: 3px;
		padding: 0.9375rem;
	}
	.box-table{
		font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
		width: 100%;
		border-collapse:collapse;
		text-align: left;
		/* 鼠标变成小手 */
		cursor:pointer;
	}
	.box-table td,.box-table th{
		border: 0.0625rem solid #f4f4f4;
		padding:3px 7px 2px 10px;
		color: #808080;
	}
	.box-table th{
		height: 2.5rem;
	}
	.bill-role-page{
		float: right;
		margin-right: 0.9375rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
