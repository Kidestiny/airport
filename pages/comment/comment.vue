<template>
	<view class="allRead">
		<view v-for="(item,index) in myData" :key="index" class="listAll">
			<view class="listItem">
				{{index}}, {{item}}
			</view>
		</view>
		<!-- <button><navigator url="pages/tabbar/tabbar-1/tabbar-1">返回使用</navigator></button> -->
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			myData: ["数据全部来自于互联网，如果有错误，缺漏，侵权等问题，请联系我",
				"概率直接按照公布的概率进行计算，没有暗自提高或者降低概率",
				"没有使用使用者的信息，无需登录，请放心使用",
				"有人即使希望我更改你的概率，也是无法更改的，因为直接没有登录功能",
				"图一乐的东西，开心就好，别太当真",
			],
		}
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
