<template>
	<div 
		class="billBackground" >
		<template v-if="authorityDatas.length != 0">
			<user-authority-list 
				:authorityDatas="authorityDatas"
				 testName="test"
				@add-authority-node="addAuthorityNode"
				@update-authority-node="updateAuthorityNode"
				@delete-authority-node="deleteAuthorityNode">
			</user-authority-list>
		</template>
		<template v-if="isShow">
			<user-authority-operation 
			:authorityOperatingData="authorityOperatingData" 
			@update-icon="updateIcon"
			@commit-authority="commitAuthority"
			@clear-authority-operatingData="clearAuthorityOperatingData">
			</user-authority-operation>
		</template>
	</div>
</template>
<script>
	import UserAuthorityList from '@/components/user/UserAuthorityList.vue';
	import UserAuthorityOperation from '@/components/user/UserAuthorityOperation.vue';
	export default{
		data() { 
			return {
				isShow: false,
				authorityOperatingData:{
					parentName: "",
					parentId: "",
					jurisdictionName: "",
					link: "",
					isShow: "",
					labelName : "",
					id: "",
					priority: "",
				},
				authorityDatas :  [],
			}
		},
		methods: {
			//增加节点权限
			addAuthorityNode(index){
				this.isShow = true;
				if(index !== -1){
					let authorityData = this.authorityDatas[index];
					this.authorityOperatingData.parentName = authorityData.jurisdictionName;
					this.authorityOperatingData.link = authorityData.link;
					this.authorityOperatingData.parentId =authorityData.id;
				}else{
					this.authorityOperatingData.parentName="";
					this.authorityOperatingData.parentId ="-1";
				}
				this.authorityOperatingData.jurisdictionName = "";
				this.authorityOperatingData.isShow = "0";
				this.authorityOperatingData.labelName = null;
				this.authorityOperatingData.priority = "";
				this.authorityOperatingData.id="";
			},
			//修改节点权限
			updateAuthorityNode(arr){
				this.isShow = true;
				let authorityData;
				if(arr[1] === undefined){
					authorityData = this.authorityDatas[arr[0]];
					this.authorityOperatingData.parentName = "";
					this.authorityOperatingData.parentId ="-1";
				}else{
					authorityData = this.authorityDatas[arr[0]].childs.[arr[1]];
					this.authorityOperatingData.parentName = this.authorityDatas[arr[0]].jurisdictionName;
					this.authorityOperatingData.parentId = this.authorityDatas[arr[0]].id;
				}
				this.authorityOperatingData.isShow = authorityData.show ? '1' : '0';
				this.authorityOperatingData.jurisdictionName = authorityData.jurisdictionName;
				this.authorityOperatingData.labelName = authorityData.labelName;
				this.authorityOperatingData.link = authorityData.link; 
				this.authorityOperatingData.priority = authorityData.priority;
				this.authorityOperatingData.id = authorityData.id;
			},
			//删除节点权限
			deleteAuthorityNode(arr){
				let promise;
				if(arr[1] === undefined){
					if(this.authorityDatas[arr[0]].childs.length === 0){
						let url = '/jurisdictionInformation/' + this.authorityDatas[arr[0]].id;
						promise = this.$axios.delete(url);
					}else{
						alert("存在子节点不能删除");
					}
				}else{
					let url = '/jurisdictionInformation/' + this.authorityDatas[arr[0]].childs[arr[1]].id;
					promise = this.$axios.delete(url);
				}
				if(promise){
					promise.then(response => {
						if(response.data.code == 200){
							//刷新列表
							alert("删除成功!");
							this.getAll();
						}else{
							alert("删除失败!");
						}
					});
				}
			},
			//清空
			clearAuthorityOperatingData(){
				this.authorityOperatingData.parentName =  "";
				this.authorityOperatingData.parentId =  "",
				this.authorityOperatingData.jurisdictionName = "",
				this.authorityOperatingData.link =  "",
				this.authorityOperatingData.isShow =  "",
				this.authorityOperatingData.labelName = "",
				this.authorityOperatingData.id = "",
				this.authorityOperatingData.priority = "",
				this.isShow = false;
			},
			//修改图标
			updateIcon(iconName){
				this.authorityOperatingData.labelName = iconName;
			},
			//提交
			commitAuthority(){
				//新建
				let promise;
				if(this.authorityOperatingData.id === ""){
					promise = this.$axios.post('/jurisdictionInformation/',{
							id: this.authorityOperatingData.id,
							parentNodeId : this.authorityOperatingData.parentId,
							jurisdictionName: this.authorityOperatingData.jurisdictionName,
							link : this.authorityOperatingData.link,
							isShow : this.authorityOperatingData.isShow === '0'? false : true,
							labelName : this.authorityOperatingData.labelName,
							priority : this.authorityOperatingData.priority
					})
				//修改
				}else{
					let url = '/jurisdictionInformation/' + this.authorityOperatingData.id;
					promise = this.$axios.put(url,{
							id: this.authorityOperatingData.id,
							parentNodeId : this.authorityOperatingData.parentId,
							jurisdictionName: this.authorityOperatingData.jurisdictionName,
							link : this.authorityOperatingData.link,
							isShow : this.authorityOperatingData.isShow === '0'? false : true,
							labelName : this.authorityOperatingData.labelName,
							priority : this.authorityOperatingData.priority
					})
				}
				promise.then(response => {
						if(response.data.code === 200){
							alert("操作成功!");
							//清空输入框
							this.clearAuthorityOperatingData();
							//刷新列表
							this.getAll();
						}
					})
			},
			//请求数据
			getAll(){
				this.$axios.get('/jurisdictionInformation/').then(response =>{
					if(response.data){
						if(response.data.code === 200){
							this.authorityDatas = response.data.data;
						}
					}
				}).catch(err =>{
					alert("请求失败！");
				})
			}
		},
		components: {
			UserAuthorityList,
			UserAuthorityOperation,
		},
		created(){
			this.getAll();
		}
	}
</script>

<style>
	.billBackground{
		border-top: solid 0.1875rem #dd4b39;
		padding: 0.625rem 8%;
	}

</style>
