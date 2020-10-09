<template>
	<div
		class="billBackground">
		<user-list></user-list>
		<user-operation></user-operation>
	</div>
</template>

<script>
	import UserList from '@/components/user/UserList.vue';
	import UserOperation from '@/components/user/UserOperation.vue';
	
	export default{
		data(){
			return {
				
			}
		},
		components: {
			UserList,
			UserOperation
		}
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}
</style>
