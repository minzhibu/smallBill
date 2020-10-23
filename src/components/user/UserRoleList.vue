<template>
	<div>
		<div class="box">
			<div class="box-header">
				<span>角色管理</span>
			</div>
			<div class="box-body">
				<table class="box-table" >
					<tr>
						<th width="60%">角色名称</th>
						<th width="10%">
							<div
								class="sjm_checked"
								:class="{'sjm_are_checked' : selectAll()}"
								@click.stop="checkAll">
								<template v-if="selectAll">
									<i class="el-icon-check"></i>
								</template>
							</div>
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
								<div
									class="sjm_checked"
									:class="{'sjm_are_checked' : selectRoles[role.id]}"
									@click.stop="sjmChecked(role.id)">
									<template v-if="selectRoles[role.id]">
										<i class="el-icon-check"></i>
									</template>
								</div>
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
		<div style="padding-left: 75%;">
			<el-button 
			class="sjm_left_button"
				type="danger" 
				plain size="small"
				@click.stop="commitDialog">
				确定
			</el-button>
			<el-button
			class="sjm_left_button"
				type="danger" 
				plain size="small"
				@click.stop="closeDialog">
				关闭
			</el-button>
		</div>
	</div>
</template>

<script>
	import BillPage from '@/components/common/BillPage.vue';
	import {selectList} from '@/api/user/RoleManagementApi.js';
	export default{
		data(){
			return {
				roleDates: [],
				pageObject: {},
				selectRoles: {},
			}
		},
		methods: {
			//分页查询
			clickPage(page){
				selectList(page,7).then(response => {
					this.roleDates = response.data.data.questions;
					this.pageObject = response.data.data;
				})
			},
			closeDialog(){
				this.$emit('close-dialog');
			},
			commitDialog(){
				let selectRoleId = [];
				for(let key in this.selectRoles){
					if(this.selectRoles[key]){
						selectRoleId.push(key);
					}
				}
				this.$emit('commit-dialog',selectRoleId); 
			},
			sjmChecked(id){
				if(this.selectRoles[id] === undefined){
					this.$set(this.selectRoles,id,true);
					return;
				}
				this.selectRoles[id] = !this.selectRoles[id];
			},
			checkAll(){
				let isSelectAll = !this.selectAll();
				for(let i = 0; i < this.roleDates.length; i++){
					let id = this.roleDates[i].id;
					if(this.selectRoles[id] === undefined){
						this.$set(this.selectRoles,id,true);
					}else{
						this.selectRoles[id] = isSelectAll;
					}
				}
			},
			selectAll(){
				for(let i = 0; i < this.roleDates.length; i++){
					let id = this.roleDates[i].id;
					if(undefined === this.selectRoles[id] || this.selectRoles[id] === false){
						return false;
					}
				}
				return true;
			}
		},
		components: {
			BillPage,
		},
		mounted(){
		},
		props: { 
		},
		created(){
			this.clickPage(1);
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
	.sjm_checked{
		height: 0.8125rem;
		width: 0.8125rem;
		border: 0.0625rem solid #808080;
		border-radius: 4px;
		padding: 0.125rem;
		color: #FFFFFF;
	}
	.sjm_are_checked{
		background-color: #409eff;
	}
</style>
