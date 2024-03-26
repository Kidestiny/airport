<template>
	<view>
		<u-notify ref="uNotify" :message="message"></u-notify>
		<u-notify message="message" show="true"></u-notify>
		<!-- <u-notice-bar :text="message"></u-notice-bar> -->
		<u-grid :border="true" align="center">
			<u-grid-item>
				<text class="grid-text">出发城市</text>
			</u-grid-item>
			<u-grid-item>
				<u--input placeholder="请输入出发城市" border="surround" v-model="fromCity" @change="change"></u--input>
			</u-grid-item>
		</u-grid>
		<u-grid :border="true" align="center">
			<u-grid-item>
				<text class="grid-text">到达城市</text>
			</u-grid-item>
			<u-grid-item>
				<u--input placeholder="请输入到达城市" border="surround" v-model="toCity" @change="change"></u--input>
			</u-grid-item>
		</u-grid>
		<u-grid :border="true" align="center" col="3">
			<u-grid-item>
				<view class="leftButton">
					<u-button @click="show = true" type="primary" :hairline="true">请选择航空公司</u-button>

					<u-picker :show="show" :columns="columns" @confirm="selectConfirm" closeOnClickOverlay="true"></u-picker>
				</view>
			</u-grid-item>
			<u-grid-item>
				{{ companyDisplay }}
			</u-grid-item>
		</u-grid>
		<u-grid :border="true" align="center" col="3" v-if="company.length < 10">
			<u-grid-item>
				<text class="grid-text">请输入仓位</text>
			</u-grid-item>
			<u-grid-item>
				<u--input placeholder="请输入飞机仓位" border="surround" v-model="airportLocationInPlane" @change="change" maxlength="1"></u--input>
			</u-grid-item>
		</u-grid>
		<u-grid :border="true" align="center" col="3">
			<view class="calcButton">
				<u-button @click="calcTheNum" type="primary" :hairline="true">里程查询啊</u-button>
			</view>
		</u-grid>
		<view class="resultText">
			<u--text type="info" :text="ansAllTitle"></u--text>
			<view class="ansAllText" v-for="item in ansAll" :key="item">
				<u-divider text="分割线" :dot="true"></u-divider>
				<u--text type="info" :text="item" class="ansAllText"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
import airportData from './dataAirport.js';
import airportGetMiles from './airportGetMiles.js';

export default {
	data() {
		return {
			fromCity: '北京',
			toCity: '深圳',
			show: false,
			columns: [['CZ-南航', 'MF-厦航', 'MU-东航']],
			companyAll: { 'CZ-南航': 'CZ', 'MF-厦航': 'MF', 'MU-东航': 'MU' },
			company: 'MU',
			companyDisplay: '←请选择航空公司',
			// company: '←请选择航空公司',
			airportLocationInPlane: 'Y',
			ans: {},
			ansAllTitle: '',
			ansAll: [],
			locationFromCity: [],
			locationToCity: [],
			dist: 0,
			messageShow: false,
			message: ''
		};
	},
	mounted() {
		this.ans = airportGetMiles;
	},
	methods: {
		change(e) {
			console.log('change', e);
		},
		selectConfirm(e) {
			console.log(e);
			this.company = this.companyAll[e.value[0]];
			this.companyDisplay = e.value[0];
			this.show = false;
		},
		calcTheNum() {
			if (this.fromCity === '') {
				this.message = '请输入出发地';
				this.$refs.uNotify.show({
					type: 'error',
					message: this.message,
					duration: 1000 * 3
				});
				return;
			}
			if (this.toCity === '') {
				this.message = '请输入目的地';
				this.$refs.uNotify.show({
					type: 'error',
					message: this.message,
					duration: 1000 * 3
				});
				return;
			}
			if (this.company === '←请选择航空公司') {
				this.message = '请选择航空公司';
				this.$refs.uNotify.show({
					type: 'error',
					message: this.message,
					duration: 1000 * 3
				});
				return;
			}
			const distInfile = this.haveInFileAToB();
			if (distInfile) {
				this.dist = distInfile;
				this.distanceToScrean('航距');
			}
			if (airportData.cityLocation[this.fromCity]) {
				this.locationFromCity = airportData.cityLocation[this.fromCity];
			}
			if (airportData.cityLocation[this.toCity]) {
				this.locationToCity = airportData.cityLocation[this.toCity];
			}
			if (this.locationFromCity.length > 0 && this.locationToCity.length > 0) {
				this.dist = this.haversine(...this.locationFromCity, ...this.locationToCity);
				this.distanceToScrean('经纬度');
			} else {
				let request1, request2;
				if (this.locationFromCity.length === 0) request1 = this.requestByCity(this.fromCity);
				if (this.locationToCity.length === 0) request2 = this.requestByCity(this.toCity);
				Promise.allSettled([request1, request2]).then((res) => {
					console.log(res, 123);
					if (res[0].status === 'fulfilled' && res[1].status === 'fulfilled') {
						if (this.locationFromCity.length === 0) this.locationFromCity = res[0].value.data?.geocodes[0]?.location.split(',').reverse();
						if (this.locationToCity.length === 0) this.locationToCity = res[1].value.data?.geocodes[0]?.location.split(',').reverse();
						this.dist = this.haversine(...this.locationFromCity, ...this.locationToCity);

						this.distanceToScrean('高德');
					} else {
						throw new Error();
					}
				});
			}
		},
		haversine(lat1, lon1, lat2, lon2) {
			const toRadians = (angle) => (angle * Math.PI) / 180;
			const earthRadius = 6371; // 地球平均半径（单位：公里）

			const dLat = toRadians(lat2 - lat1);
			const dLon = toRadians(lon2 - lon1);

			const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const distance = earthRadius * c;

			return Math.ceil(distance);
		},
		haveInFileAToB() {
			console.log(123)
			return airportData.distanceAToB[`${this.fromCity}-${this.toCity}`] || airportData.distanceAToB[`${this.toCity}-${this.fromCity}`];
		},
		distanceToScrean(dataOrigin) {
			const ansTitle = `从${this.fromCity} 到 ${this.toCity} 的距离是: ${this.dist}km，数据来源：${dataOrigin}\n`;
			this.ansAllTitle = ansTitle;
			const allLocation = Object.keys(Object.values(this.ans[this.company + 'Fin'])[0]);
			if (this.airportLocationInPlane) {
				this.ansAll = [this.dataFormat(this.airportLocationInPlane)];
			} else {
				const ansAll = [];
				console.log(allLocation);
				allLocation.forEach((airportLocationInPlane) => {
					console.log(airportLocationInPlane);
					ansAll.push(this.dataFormat(airportLocationInPlane));
				});
				this.ansAll = ansAll;
			}
		},
		requestByCity(city) {
			return uni.$lv.request.get(`https://restapi.amap.com/v3/geocode/geo?address=${city}&key=d161eeadb72f5d3cd242d3cd53324a2d`);
		},
		dataFormat(airportLocationInPlane) {
			let result = `舱位：${airportLocationInPlane}\n`;
			if (this?.ans[this.company + 'Fin']?.DL?.[airportLocationInPlane]?.data)
				result += `${this.company} 累积到 DL ${this?.ans[this.company + 'Fin']?.DL?.[airportLocationInPlane]?.data * this.dist}积分，消费金额比例${
					this?.ans[this.company + 'Fin']?.DL?.[airportLocationInPlane]?.num
				}\n`;
			if (this?.ans[this.company + 'Fin']?.CZ?.[airportLocationInPlane]?.data)
				result += `${this.company} 累积到 CZ ${this?.ans[this.company + 'Fin']?.CZ?.[airportLocationInPlane]?.data * this.dist}积分，航段${
					this?.ans[this.company + 'Fin']?.CZ?.[airportLocationInPlane]?.num
				}个\n`;
			if (this?.ans[this.company + 'Fin']?.MF?.[airportLocationInPlane]?.data)
				result += `${this.company} 累积到 MF ${this?.ans[this.company + 'Fin']?.MF?.[airportLocationInPlane]?.data * this.dist}积分，航段${
					this?.ans[this.company + 'Fin']?.MF?.[airportLocationInPlane]?.num
				}个`;
			return result;
		}
	}
};
</script>
<style>
.leftButton {
	margin-left: -100rpx;
}
.calcButton {
	width: 70%;
	margin: 10px;
}
.resultText {
	margin: 10px;
	padding: 10px;
}
.ansAllText {
	/* line-height: 12px; */
}
</style>
