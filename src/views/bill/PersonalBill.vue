<template>
	<div>
		<div class="billBackground" >
			<div class="bill-title">
				<h3 >个人账单</h3> 
			</div>
			<div class="bill-main">
				<el-input class="myInput-left" placeholder="账单名称" v-model="publicBillMain.billName">
				    <template slot="prepend">
							<i class="el-icon-edit"></i>
						</template>
				</el-input>
				<el-input class="myInput-right" placeholder="购买时间" v-model="publicBillMain.createDate" suffix-icon="el-icon-date">
				    <template slot="prepend">
							<i class="el-icon-edit"></i>
						</template>
				</el-input>
				<el-input class="myInput-left" placeholder="标签" v-model="publicBillMain.label">
				    <template slot="prepend">
							<i class="el-icon-edit"></i>
						</template>
				</el-input>
			</div>
			<bill-table @totle-amout="totleAmout"  :datas="publicBillFroms"></bill-table>
			<el-row class="bill-button">
			  <el-button type="primary">提交</el-button>
			  <el-button type="info" @click="clear">清空</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	import BillTable from '@/components/common/BillTable.vue'
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
			}
		},
		components :{
			BillTable 
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
		}
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
		height: 100%;
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
