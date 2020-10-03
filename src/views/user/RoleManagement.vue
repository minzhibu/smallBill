<template>
	<div
		class="billBackground" >
		<role-list 
			:roleDates="roles"
			@add-authority-node="addAuthorityNode"
			@delete-authority-node="deleteAuthorityNode"
			@update-authority-node="updateAuthorityNode">
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
	import {selectList,roleInsert,roleDelete,selectByIdToJurisdiction,roleUpdate} from '@/api/user/RoleManagementApi.js';
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
			this.selectByPage(1,7);
		},
		methods: {
			//新建角色
			addAuthorityNode(){
				this.role.id = '';
				this.role.defaultRole = '';
				this.role.ext1 = '';
				this.role.name = '';
				this.role.state = '';
				this.role.createTime = '';
				this.role.updateTime = '';
				this.role.authoritys = [];
				//初始化节点权限
				jurisdictionList().then(response => {
					this.role.authorityDatas = response.data.data;
					for(let i = 0; i < this.role.authorityDatas.length; i++) {
						let authority = new Object();
						authority.name = this.role.authorityDatas[i].jurisdictionName;
						authority.id = this.role.authorityDatas[i].id;
						authority.isSelect = false;
						authority.childs = [];
						for(let j = 0; j < this.role.authorityDatas[i].childs.length; j++) {
							let child = this.role.authorityDatas[i].childs[j];
							let authorityChild = new Object();
							authorityChild.name = child.jurisdictionName;
							authorityChild.id = child.id;
							authorityChild.isSelect = false;
							authority.childs.push(authorityChild);
						}
						this.role.authoritys.push(authority);
						this.isShow = true;
					}
				})
			},
			//提交
			roleCommit(){
				let promise;
				let arr = [];
				//获取选中的权限
				for(let i = 0; i < this.role.authoritys.length; i++) {
					if(this.role.authoritys[i].isSelect){
						arr.push(this.role.authoritys[i].id);
					}
					for(let j = 0; j < this.role.authoritys[i].childs.length; j++) {
						let childs = this.role.authoritys[i].childs;
						if(childs[j].isSelect){
							arr.push(childs[j].id);
						}
					}
				}
				let data = {
						id: this.role.id,
						defaultRole: this.role.defaultRole,
						ext1: this.role.ext1,
						roleName: this.role.name,
						state: this.role.state,
						createTime: this.role.createTime,
						updateTime: this.role.updateTime,
						authoritys: arr
				}
				//当id不存在时新建
				if(this.role.id === ''){
					promise = roleInsert(data)
				//修改
				}else{
					console.log("??");
					promise = roleUpdate(this.role.id,data);
				}
				if(promise){
					promise.then(response => {
						alert("操作成功!");
						this.isShow = false;
						this.selectByPage(1,7);
					})
				}
			},
			//分页查询
			selectByPage(page,size){
				selectList(page,size).then(response => {
					this.roles = response.data.data.questions;
				})
			},
			//删除角色
			deleteAuthorityNode(index){
				roleDelete(this.roles[index].id).then(response => {
					alert("删除成功!");
					this.selectByPage(1,7);
				});
			},
			//修改角色
			updateAuthorityNode(index){
				let than = this;
				let role = than.roles[index];
				than.role.id = role.id;
				than.role.defaultRole = role.defaultRole;
				than.role.ext1 = role.ext1;
				than.role.name = role.roleName;
				than.role.state = role.state;
				than.role.createTime = role.createTime;
				than.role.updateTime = role.updateTime;
				than.role.authoritys = [];
				//初始化节点权限
				let jurisdictionAllList = jurisdictionList();
				let jurisdictionSelectList = selectByIdToJurisdiction(role.id);
				Promise.all([jurisdictionAllList,jurisdictionSelectList]).then(function(values){
					let jurisdictionSelectArray = values[1].data.data;
					let selectMap = new Map();
					for(let i = 0; i < jurisdictionSelectArray.length; i++) {
						selectMap.set(jurisdictionSelectArray[i].id,'1');
						for(let j = 0; j < jurisdictionSelectArray[i].childs.length; j++) {
							selectMap.set(jurisdictionSelectArray[i].childs[j].id,'1');
						}
					}
					than.role.authorityDatas = values[0].data.data;
					for(let i = 0; i < than.role.authorityDatas.length; i++) {
						let authority = new Object();
						authority.name = than.role.authorityDatas[i].jurisdictionName;
						authority.id = than.role.authorityDatas[i].id;
						if(selectMap.has(than.role.authorityDatas[i].id)){
							authority.isSelect = true
						}else{
							authority.isSelect = false;
						}
						authority.childs = [];
						for(let j = 0; j < than.role.authorityDatas[i].childs.length; j++) {
							let child = than.role.authorityDatas[i].childs[j];
							let authorityChild = new Object();
							authorityChild.name = child.jurisdictionName;
							authorityChild.id = child.id;
							if(selectMap.has(child.id)){
								authorityChild.isSelect = true
							}else{
								authorityChild.isSelect = false;
							}
							authority.childs.push(authorityChild);
						}
						than.role.authoritys.push(authority);
						than.isShow = true;
					}
				})
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
