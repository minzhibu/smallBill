<template>
	<div class="authority-operating">
		<div class="authority-operating-box">
			<div class="authority-operating-box-row">
				<span class="authority-operating-box-left">
					<span class="authority-operating-box-label">
						<label >
							角色名称:
						</label>
					</span>
					<el-input
					  v-model="role.name"
						class="authority-operating-box-content">
					</el-input>
				</span>
				<span class="authority-operating-box-right">
					<span class="authority-operating-box-label">
						<label>
							角色状态:
						</label>
					</span>
					<el-input
						v-model="role.state"
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
							角色权限:
						</label>
					</span>
					<span
						@click="dialogTableVisible = true">
						<el-input
						  :value="roleAuthority"
							class="authority-operating-box-content"
							@keydown="noInput"
							>
						</el-input>
					</span>
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
		<el-dialog 
			title="节点权限" 
			width="30%" 
			:visible.sync="dialogTableVisible">
			<role-authority-list 
				:authorityDatas="role.authorityDatas"
				:role="role"
				:authoritys="role.authoritys"
				@close-dialog="closeDialog"
				@commit-dialog="commitDialog">
			</role-authority-list>
		</el-dialog>
	</div>
</template>

<script>
	import RoleAuthorityList from '@/components/user/RoleAuthorityList.vue'
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
				this.$emit('role-commit');
			}
		},
		components: {
			RoleAuthorityList
		},
		props: {
			role: {
				type: Object,
			}
		},
		computed: {
			//选中了那些权限
			roleAuthority: function(){
				let result = '';
				let authoritys = this.role.authoritys;
				if(authoritys.length != 0){
					for(let i = 0; i < authoritys.length; i++) {
						if(authoritys[i].isSelect){
							result += authoritys[i].name + ',';
							let childs = authoritys[i].childs;
							for(let j = 0; j < childs.length; j++) {
								if(childs[j].isSelect){
									result += childs[j].name + ',';
								}
							}
						}
					}
				}
				return result;
			}
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
