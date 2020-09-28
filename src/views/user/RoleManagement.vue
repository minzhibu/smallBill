<template>
	<div
		class="billBackground" >
		<role-list :roleDates="roles"></role-list>
		<role-operation :role="role"></role-operation>
	</div>
</template>

<script>
	import RoleList from '@/components/user/RoleList.vue';
	import RoleOperation from '@/components/user/RoleOperation.vue';
	export default{
		data(){
			return {
				roles:[
					{
						id: "",
						roleName : "超级管理员",
						createTime : "2020-9-17",
						updateTime : "2020-9-17",
						state: "1",
						defaultRole: "1",
						ext1 : "1"
					},
					{
						id: "",
						roleName : "管理员",
						createTime : "2020-9-17",
						updateTime : "2020-9-17",
						state: "1",
						defaultRole: "1",
						ext1 : "1"
					},
					{
						id: "",
						roleName : "用户",
						createTime : "2020-9-17",
						updateTime : "2020-9-17",
						state: "1",
						defaultRole: "1",
						ext1 : "1"
					},
					{
						id: "",
						roleName : "用户",
						createTime : "2020-9-17",
						updateTime : "2020-9-17",
						state: "1",
						defaultRole: "1",
						ext1 : "1"
					},
					{
						id: "",
						roleName : "用户",
						createTime : "2020-9-17",
						updateTime : "2020-9-17",
						state: "1",
						defaultRole: "1",
						ext1 : "1"
					},
				],
				role: {
					name: '',
					stat: '',
					authoritys: []
				}
			}
		},
		components: {
			RoleList,
			RoleOperation
		}
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}
</style>
