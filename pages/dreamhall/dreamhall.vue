<template>
	<view>
		<view class="seleteAll myForm">
			<view class="seleteLeft">
				<text>请选择皮肤</text>
			</view>
			<view class="seleteRight">
				<u-radio-group type="select" v-model="value">
					<u-radio v-for="(item) in dreamHallData" :disabled="disabled" :key="item.data" :name="item.data">
						{{ item.name }}
					</u-radio>
					
				</u-radio-group>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import store from '@/store';
	import configURL from '@/configNetwork.js';
	import myTipTop from '@/components/tipTop/tipTop.vue'
	export default {
		data(){
				return {
					title: '1'
				}
		},

		onLoad() {
	
			
		},
		methods: {
			// 点击actionSheet回调
		
		},
	}
</script>
<style lang="scss">
	.myForm {
		margin-left: 20rpx;
		margin-top: 80rpx;
	}
</style>

<style scoped>
	.seleteAll {
		display: flex;
	}

	.seleteLeft {
		flex: 2;
		margin-left: 10px;
		margin-top: 10px;
	}

	.seleteRight {
		flex: 7;
	}

	.myMiddle {
		width: 80%;
	}

	.myButton {
		/* width: 50rpx; */
		/* margin-left: -100rpx; */
		padding: 8rpx;
		font-size: 14rpx;
	}

	.myButtonAll {
		display: flex;
		margin-top: 10rpx;
	}

	.myButtonIn {
		flex: 1;
		padding: 8rpx;
		font-size: 14rpx;

	}


	.aboutMe {
		position: fixed;
		bottom: 9rpx;
		left: 9rpx;
	}
</style>

<style>
	.myPopup {
		margin: 10rpx 20rpx;
	}

	.myButtonClear {
		margin-left: 60%;
		/* margin-top: -60%; */
		padding: 10rpx;
		font-size: 14rpx;
	}

	.textC {
		margin-left: 10rpx;
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		
	}
</style>
