<template>
	<div
		class="billBackground" >
		<role-list 
			:roleDates="roles"
			@add-authority-node="addAuthorityNode">
		</role-list>
		<role-operation 
			:role="role"
			v-if="isShow"
			@role-commit="roleCommit">
		</role-operation>
	</div>
</template>

<script>
	import RoleList from '@/components/user/RoleList.vue';
	import RoleOperation from '@/components/user/RoleOperation.vue';
	import {selectList,roleInsert} from '@/api/user/RoleManagementApi.js';
	import {jurisdictionList} from '@/api/user/JurisdictionInformationApi.js'
	export default{
		data(){
			return {
				//列表展示的数据
				roles:[],
				//是否展示输入
				isShow: false,
				//提交的数据
				role: {
					id: '',
					defaultRole: '',
					ext1: '',
					name: '',
					state: '',
					createTime: '',
					updateTime: '',
					//该角色的权限
					authoritys: [],
					//所有的权限
					authorityDatas:[],
					authoritys:[],
				},
				//权限
				
			}
		},
		components: {
			RoleList,
			RoleOperation
		},
		created(){
			selectList(1,3).then(response => {
				console.log(response.data);
				this.roles = response.data.data.questions;
			})
			jurisdictionList().then(response => {
				console.log(response.data);
				this.role.authorityDatas = response.data.data;
			})
		},
		methods: {
			//新建角色
			addAuthorityNode(){
				this.isShow = true;
				console.log("isShow");
				this.role.id = '';
				this.role.defaultRole = '';
				this.role.ext1 = '';
				this.role.name = '';
				this.role.state = '';
				this.role.createTime = '';
				this.role.updateTime = '';
				this.role.authoritys = [];
				//选中的权限
				for(let i = 0; i < this.role.authorityDatas.length; i++) {
					let authority = new Object();
					authority.name = this.role.authorityDatas[i].jurisdictionName;
					authority.id = "1";
					authority.isSelect = false;
					authority.childs = [];
					for(let j = 0; j < this.role.authorityDatas[i].childs.length; j++) {
						let child = this.role.authorityDatas[i].childs[j];
						let authorityChild = new Object();
						authorityChild.name = child.jurisdictionName;
						authorityChild.id = "1";
						authorityChild.isSelect = false;
						authority.childs.push(authorityChild);
					}
					this.role.authoritys.push(authority);
				}
				console.log(this.role.authoritys);
			},
			//提交
			roleCommit(){
				//新建
				let promise;
				console.log(this.role);
				let arr = ['123','213','352','1234123','123123']
				if(this.role.id === ''){
					promise = roleInsert({
						id: this.role.id,
						defaultRole: this.role.defaultRole,
						ext1: this.role.ext1,
						roleName: this.role.name,
						state: this.role.state,
						createTime: this.role.createTime,
						updateTime: this.role.updateTime,
						authoritys: arr
					})
				//修改
				}else{
					
				}
				if(promise){
					promise.then(response => {
						console.log(response.data);
					})
				}
			}
		}
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}
</style>
