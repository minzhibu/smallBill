<template>
	<div class="bill-upload-image" @click.stop="clickUpload($event)">
		<i 
			v-if="!billUploadImage" 
			class="bill-upload-icon el-icon-plus" 
			@click.stop="clickUploadIcon($event)"
			>
		</i>
		<input 
			type="file" 
			style="display: none" 
			@change.stop="uploadImage($event)" 
			accept="image/jpeg,image/jpg,image/png,image/PNG">
		<img 
			class="bill-upload-image"
			 v-if="billUploadImage"
			:src="billUploadImage" 
			@click.stop="clickUploadIcon($event)" 
			@dblclick.stop="showImage"/>
	</div>
</template>

<script>
	import {uploadImageApi} from "@/api/upload/uploadFile.js"
	export default({
		data(){
			return {
				billUploadImage: "",
				timeClean: "",
			}
		},
		methods: {
			uploadImage(event){
				let than = this;
				var files = event.currentTarget.files;
				if(files.length != 0){
					let param = new FormData();
					param.append('file',files[0]);
					uploadImageApi(param).then(response => {
						console.log(response);
						than.billUploadImage = "/api" + response.data;
					}).catch(error => {
						console.log(error);
					})
					//this.$emit('upload_image',files[0]);
				}
			},
			clickUpload(than){
				if(!than.srcElement.childNodes[1]){
					return;
				}
				than.srcElement.childNodes[1].click();
			},
			clickUploadIcon(than){
				clearTimeout(this.timeClean);//clear双击中的第二次单击事件。
				this.timeClean = setTimeout(function() {
					let parent = than.srcElement.parentNode;
					parent.childNodes[1].click();
					//your code
				}, 500);

				
			},
			showImage(){
				clearTimeout(this.timeClean);//clear双击中的第一次单击事件。
				console.log("这是双击事件")
			}
		}
	})
</script>

<style>
	.bill-upload-image{
		display: inline-block;
		text-align: center;
		width: 9.1875rem;
		height: 9.1875rem;
		border: 1px dashed #c0ccda;
		background-color: #fbfdff;
		border-radius: 0.375rem;
		box-sizing: border-box;
		cursor: pointer;
		line-height: 9.125rem;
		vertical-align: top;
	}
	.bill-upload-icon{
		font-size: 28px;
		color: #8c939d;
	}
	.bill-upload-image{
		
	}
</style>
