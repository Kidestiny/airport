<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.cloud.init({
			  traceUser: true
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
