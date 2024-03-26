<template>
	<view class="allRead">
		<u--image :src="url" mode="widthFix" @click="previewImage" style="margin: 8rpx;"></u--image>
		<!-- <button><navigator url="pages/tabbar/tabbar-1/tabbar-1">返回使用</navigator></button> -->
		<ad unit-id="adunit-c2c9c48c45ec5db4" ad-type="video" ad-theme="white"></ad>
		<view style="text-align: center; font-size: 20px;margin-bottom: 8rpx;">点击图片，长按识别小程序码即可领取</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
			// url:"/static/takeout.jpg"
			url:"https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/takeout.jpg?sign=8ccd8e23c94f369bc070318980c418bd&t=1629038804"
			
		}
	},
	previewImage: function(e) {
		console.log("123456+")
		console.log(e)
		// var current = e.target.dataset.src;
		wx.previewImage({
			current: url,
			urls: [url]
		})
	},
	methods:{
		previewImage: function(e) {
			console.log("123456+")
			console.log(e)
			// var current = e.target.dataset.src;
			wx.previewImage({
				current: this.url,
				urls: [this.url]
			})
		},
	}

}
</script>

<style lang="scss">
.allRead {
	// background-color: #7e7d72;
}
.listItem{
	
}
.listAll{
	margin: 10rpx;
}
</style>
