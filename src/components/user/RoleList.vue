<template>
	<div>
		<div class="box">
			<div class="box-header">
				<span>角色管理</span>
			</div>
			<div class="box-body">
				<table class="box-table" >
					<tr>
						<th width="10%">角色名称</th>
						<th width="10%">是否启用</th>
						<th width="10%">系统角色</th>
						<th width="10%">功能
							<el-button
								type="primary" 
								plain size="small"
								@click.stop="addRole(-1)">
								增加角色
							</el-button>
						</th>
					</tr>
					<template v-for="(role ,index) in roleDates">
						<tr 
							:key="'parent-' + index"
							@click="showChild(index)">
							<td>
								{{role.roleName}}
							</td>
							<td>
								{{role.state == 1 ? '是' : '否'}}
							</td>
							<td>
								{{role.defaultRole == 1 ? '是' : '否'}}
							</td>
							<td>
								<el-button 
									type="success" 
									plain size="small"
									@click.stop="updateRole(index)">
									修改
								</el-button>
								<el-button 
									type="danger" 
									plain size="small"
									@click.stop="deleteRole(index)">
									删除
								</el-button>
							</td>
						</tr>
					</template>
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
				initIshowChild: [],
			}
		},
		methods: {
			showChild(index){
				this.initIshowChild.splice(index,1,!this.initIshowChild[index]);
			},
			//增加角色
			addRole(index){
				this.$emit('add-authority-node',index);
			},
			//修改角色
			updateRole(index){
				this.$emit('update-authority-node',index);
			},
			//删除角色
			deleteRole(index){
				this.$emit('delete-authority-node',index);
			},
			//分页查询
			clickPage(page){
				this.$emit("click-page",page);
			}
		},
		components: {
			BillPage,
		},
		mounted(){
		},
		props: { 
			roleDates: {
				type: Array
			},
			pageObject:{
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
