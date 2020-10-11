<template>
	<div
		class="billBackground">
		<user-list
			:users="users"
			:pageObject="pageObject"
			@click-page="clickPage">
		</user-list>
		<user-operation
			>
		</user-operation>
	</div>
</template>

<script>
	import UserList from '@/components/user/UserList.vue';
	import UserOperation from '@/components/user/UserOperation.vue';
	import {selectList,userInsert,userUpdate,userDelete} from '@/api/user/UserManagementApi.js';	
	export default{
		data(){
			return {
				users: [],
				pageObject: {},
				user:{
					
				}
			}
		},
		methods: {
			selectByPage(page,size){
				selectList(page,size).then(response => {
					this.users = response.data.data.questions;
					this.pageObject = response.data.data;
				})
			},
			clickPage(page){
				this.selectByPage(page,2);
			}
		},
		components: {
			UserList,
			UserOperation
		},
		created(){
			this.selectByPage(1,2);
		}
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}
</style>
