<template>
	<view class="content">
		<view class="u-content">
			<u-parse :html="content"></u-parse>

			<!-- <view class="support"><u-image bindtap="previewImage" mode="widthFix" width="100%" height="600rpx" :show-menu-by-longpress="show" :src="url"></u-image></view>
			<view class="supportbutton"><u-button type="default" @click="saveToAlbum">点击保存赞赏码，支持一下</u-button></view> -->

		</view>
		<view class="btn-area">
			<navigator target="miniProgram" open-type="navigate" app-id="wx8f963f6fe6572c9c" path="pages/tabbar/tabbar-1/tabbar-1"
			 extra-data="" version="release" class='nav'>我要抽武将和皮肤</navigator>

		</view>
		<u-button open-type="share" type="primary" ripple="true" plain="true">
			<view>分享给好友</view>
		</u-button>
		<view style="margin: 10rpx 0;">
			<u-button open-type="contact" ripple="true" plain="true" >
				<view>联系我们</view>
			</u-button>
		</view>
		<ad unit-id="adunit-7aada571f06aec65"></ad>
		<view style="position: absolute;bottom: 10rpx;margin: 0 auto;">
			<!-- <text style="text-align: center;" pages/comment/comment>免责声明|隐私政策</text> -->
			<navigator url="/pages/comment/comment">免责声明|隐私政策</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				url: 'https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/supportme.jpg?sign=ab039f68f6f3dff6d9524ad150e252d9&t=1616049049',
				content: `<p> 如果有任何问题可以联系我 </p>
							<p>邮箱：destinysgs@163.com</p>
							<p>QQ群：937602725</p>`,
			}
		},
		// previewImage: function() {
		// 	wx.previewImage({
		// 		urls: ['cloud://carutil-007.6361-carutil-007/admire-qrcode.jpg'],
		// 	});
		//   },
		methods: {

			saveToAlbum() {
				// 下载图片资源到本地
				wx.downloadFile({
					url: this.url,
					success: function(res) {
						// 保存图片到相册
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								// 保存成功
							},
							fail: () => {
								// 保存失败
							}
						});
					},
					fail: () => {
						// 下载失败
					}
				});
			}
		},
		previewImage: function(e) {
			var current = e.target.dataset.src;
			wx.previewImage({
				current: current,
				urls: [current]
			})
		},
		onShareAppMessage: function(res) {
			if (res.from === 'button') {
				console.log(res.target)
			}
			let title = '盒子模拟器'
			return {
				title: title,
				path: 'pages/luckbox/luckbox',
				imageUrl: 'https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/shareBox.png?sign=22d7ba1f31fb52d4c2bbd4db16d91826&t=1617197912'
			}
		},
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400rpx;
		margin: 0 10rpx;
		margin-top: 100rpx;
	}
	.u-content {
		margin-top: 40rpx;
		margin-left: 20rpx;
	}

	.support {
		margin-top: 50rpx;
		width: 95%;
		height: 80%;
		/* display: flex;
	justify-content: center; */
	}

	.supportbutton {
		width: 90%;
		margin: 10rpx 10rpx 10rpx 10rpx;
	}

	.content {
		text-align: center;
		height: 400rpx;
		margin: 0 10rpx;
		margin-top: 100rpx;
	}

	.btn-area {
		display: flex;

		margin: 10rpx 0;
	}

	.nav {
		color: #ffffff;
		/* height: 120rpx; */
		/* width: 50rpx; */
		flex: 1;
		font-size: 30rpx;
		line-height: 90rpx;
		background: #2979ff;
		text-align: center;
	}
</style>
