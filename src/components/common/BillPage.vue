<template>
	<div>
		<ul class="bill-page-ul">
			<!-- 是否展示上一页 -->
			<li 
				v-if="pageObject.showPrevious" 
				class="bill-page-li-left"
				@click="clickPage(pageObject.page - 1)">
				&laquo;
			</li>
			<!-- 是否展示首页 -->
			<template v-if="pageObject.showFirstPage">
				<li @click="clickPage(1)">1</li>
				<li>...</li>
			</template>
			<li 
				v-for="(item, index) in pageObject.pages" 
				:class="{'bill-page-active': item == pageObject.page}" 
				:key="index"
				@click="clickPage(item)">
				{{item}}
			</li>
			<!-- 是否展示尾页 -->
			<template v-if="pageObject.showEndPage">
				<li>...</li>
				<li
					@click="clickPage(pageObject.totalPage)">
					{{pageObject.totalPage}}
				</li>
			</template>
			<!-- 是否展示下一页 -->
			<li 
				v-if="pageObject.showNext" 
				class="bill-page-li-right"
				@click="clickPage(pageObject.page + 1)">
				&raquo;
			</li>
		</ul>
	</div>
</template>

<script>
	export default({
		data(){
			return {
			}
		},
		methods: {
			clickPage(page){
				if(page != this.pageObject.page){
					//抛出事件
					this.$emit('click-page',page);
				}
			}
		},
		props: {
			pageObject: {
				type: Object
			}
		}
	})
</script>

<style>
	.bill-page-ul{
		/* 鼠标变成小手 */
		cursor:pointer;
		display: inline-block;
		border-radius: 4px;
	}
	.bill-page-ul li{
		display: inline;
		padding: 6px 12px;
		text-align: center;
		border: 1px solid #ddd;
		margin-left: -0.0625rem;
		color: #808080;
	}
	.bill-page-li-left{
		margin-left: 0;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		background-color: white;
	}
	.bill-page-li-right{
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		background-color: white;
	}
	.bill-page-active{
		background-color: #f0f9eb;
	}
</style>
