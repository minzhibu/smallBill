<template>
	<div>
		<div class="billBackground" >
			<div class="bill-title">
				<h3 >团体账单</h3>
			</div>
			<div class="bill-main">
				<el-input class="myInput-left" placeholder="账单名称" v-model="publicBillMain.billName">
				    <template slot="prepend">
							<i class="el-icon-edit"></i>
						</template>
				</el-input>
				<el-input class="myInput-right" placeholder="标签" v-model="publicBillMain.label">
				    <template slot="prepend">
							<i class="el-icon-edit"></i>
						</template>
				</el-input>
				<div @click="openDialog">
					<el-input class="myInput-left" placeholder="关联人" v-model="userName" >
					    <template slot="prepend">
								<i class="el-icon-edit"></i>
							</template>
					</el-input>
				</div>
			</div>
			<bill-table @totle-amout="totleAmout"  :datas="publicBillFroms"></bill-table>
			<el-row class="bill-button">
			  <el-button type="primary">提交</el-button>
			  <el-button type="info" @click="clear">清空</el-button>
			</el-row>
		</div>
		
		<el-dialog
			title="用户" 
			width="30%" 
			:visible.sync="dialogTableVisible">
			<div style="height: 400px">
				<user-list
					@close-dialog="closeDialog"
					@commit-dialog="commitDialog"
					@commit-select-user="commitSelectUser"
					:user="user">
				</user-list>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import BillTable from '@/components/common/BillTable.vue'
	import UserList from '@/components/bill/UserList.vue'
	export default {
		data(){
			return {
				input1: "1",
				publicBillMain : {
				  billName: "",
				  createDate : "",
				  label: "",
				  users: "",
				  totleAmout: 0
				},
				publicBillFroms : [{
				  name : "",
				  price : "",
				  amount : "",
				  label : ""
				}],
				dialogTableVisible: false,
				user: {},
				userName: ""
			}
		},
		components :{
			BillTable,
			UserList
		},
		methods: {
		  //提交
		  commit() {
		    
		  },
		  //清空
		  clear() {
		    this.publicBillMain = {
		      billName: "",
		      createName : "",
		      label: "",
		      users: "",
		      totleAmout: 0
		    }
		    this.publicBillFroms = [{
		      name : "",
		      price : "",
		      amount : "",
		      label : ""
		    }]
		  },
			totleAmout(result){
				this.publicBillMain.totleAmout=result;
			},
			closeDialog(){
				dialogTableVisible = false;
			},
			commitDialog(selectUserId){
				this.publicBillMain.users = "";
				for(let i = 0; i < selectUserId.length; i++) {
					this.publicBillMain.users += selectUserId[i];
				}
			},
			commitSelectUser(selectUserNames){
				this.userName = "";
				for(let i = 0; i < selectUserNames.length; i++) {
					this.userName += selectUserNames[i];
				}
			},
			openDialog(){
				console.log("???");
				this.dialogTableVisible = true;
			}
		}
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}
	.myInput-left{
		width: 47.5%;
		margin-right: 2.5%;
		margin-bottom: 10px;
	}
	.myInput-right{
		width: 47.5%;
		margin-left: 2.5%;
		margin-bottom: 10px;
	}
	.bill-title{
		display: inline-block;
		font-size: 1.125rem;
		margin: 0;
		padding-left: 0.1875rem;
		margin-bottom: 0.3125rem;
	}
	.bill-main{
		padding: 0.625rem 0.1875rem;
		border-top: solid 0.0625rem gray;
	}
	.bill-button{
		padding: 0.9375rem 0rem 0rem 45%;
		
	}
</style>
