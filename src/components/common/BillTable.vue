<template>
	<div class="box">
		<div class="box-header">
			<span>购买物品清单</span>
		</div>
		<div class="box-body">
			<table class="box-table" @keyup="tableKeyUp">
				<tr>
					<th>物品名称</th>
					<th>单价</th>
					<th>金额</th>
					<th>标签</th>
					<th>功能</th>
				</tr>
				<template v-for="(item,i) in datas" >
					<tr :key="i" @keyup="delTr(i,$event)">
						<td>
							<el-input v-model="item.name" ></el-input>
							</td>                      
						<td>                         
							<el-input type="number" step="0.01" v-model="item.price" ></el-input>
							</td>                      
						<td>                         
							<el-input type="number" step="0.01" v-model="item.amount" ></el-input>
							</td>                      
						<td>                         
							<el-input v-model="item.label" ></el-input>
							</td>
						<td>
							回车添加，del删除
						</td>
					</tr>
				</template>
				
			</table>
		</div>
		<h4 class="totle-amout">共计{{totleAmout()}}元</h4>
	</div>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		methods: {
			tableKeyUp(event){
			  //添加一行账单内的元素
			  if(event.keyCode === 13){
			    this.datas.push({
			      name : "",
			      price : "",
			      amount : "",
			      label : ""
			    })
			  }
			},
			//删除一行账单内的元素
			delTr(index,event){
			  if(event.keyCode === 46){
			    if(this.datas.length === 1){
			      alert("只剩一条不能删除")
			    }else{
			      this.datas.splice(index,1)
			    }
			  }
			},
			//计算总金额
			totleAmout(){
			  let result = 0;
			  for(let i = 0 ; i < this.datas.length; i++) {
			    let amount = Number(this.datas[i].amount);
			    if(!isNaN(amount)){
			      result += amount;
			    }
			  }
			  result = result.toFixed(2);
				this.$emit('totle-amout',result);
				return result;
			},
		},
		props: ['datas']
	}
</script>

<style>
	.box{
		position: relative; 
		border-radius: 3px;
		background: #ffffff;
		border-top: 3px solid #d2d6de;
		margin-bottom: 1.5625rem;
		width: 100%;
		box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.1);
	}
	.box-header{
		padding: 0.625rem;
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
	}
	.box-table td,.box-table th{
		border: 0.0625rem solid #f4f4f4;
		padding:3px 7px 2px 7px;
	}
	.box-table th{
		text-align: left;
	}
	.totle-amout{
		float: right;
		margin-right: 12px;
		font-weight: 500;
		line-height: 1.1;
		color: inherit;
		margin-top: 10px;
		margin-bottom: 10px
	}
</style>
