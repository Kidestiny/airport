<template>
	<view>
		<view :width="550" trigger="click">
			<view class="header">
				<view class="headerButton">
					<u-search placeholder="你想查找的机场" v-model="keyword" height="40" @change="change" @search="search"></u-search>
				</view>
			</view>
		</view>
		<text class="textHeader">猜你想搜：</text>
		<view class="midGuess">
			<view class="midGuessItem" v-for="item in hot" :key="item">
				<u-tag :text="item" :index="item" mode="light" shape="circle" @click="search(item)" />
			</view>
		</view>
		<view class="" v-if="result !== ''">
			<view class="textHeader">搜索结果：{{ result }}</view>
			<view class="bankContain">
				<view class="bankItem" v-if="addDataAirport[result].abc.people">{{ bank.abc }} {{ addDataAirport[result].abc.people }} {{ addDataAirport[result].abc.mode }}</view>
				<view class="bankItem" v-if="addDataAirport[result].cmb.people">{{ bank.cmb }} {{ addDataAirport[result].cmb.people }} {{ addDataAirport[result].cmb.mode }}</view>
				<view class="bankItem" v-if="addDataAirport[result].ibc.people || addDataAirport[result].ibc.mode">{{ bank.ibc }} {{ addDataAirport[result].ibc.people }} {{ addDataAirport[result].ibc.mode }}</view>
				<view class="bankItem" v-if="addDataAirport[result].ccn.people">{{ bank.ccn }} {{ addDataAirport[result].ccn.people }} {{ addDataAirport[result].ccn.mode }}</view>
				<view class="bankItem" v-if="addDataAirport[result].bocom.people">
					{{ bank.bocom }} {{ addDataAirport[result].bocom.people }} {{ addDataAirport[result].bocom.mode }}
				</view>
				<view class="bankItem" v-if="addDataAirport[result].cgb.people">{{ bank.cgb }} {{ addDataAirport[result].cgb.people }} {{ addDataAirport[result].cgb.mode }}</view>
				<view class="bankItem" v-if="addDataAirport[result].union.people">
					{{ bank.union }} {{ addDataAirport[result].union.people }} {{ addDataAirport[result].union.mode }}
				</view>
			</view>
			<u-collapse :value="['promptCip']">
				<u-collapse-item title="CIP提示" name="promptCip">
					<text class="u-collapse-content">{{ promptCip }}</text>
				</u-collapse-item>
				<u-collapse-item title="统计类型" name="staticType">
					<text class="u-collapse-content">{{ staticType }}</text>
				</u-collapse-item>
			</u-collapse>
			
		</view>
		<!-- <ad unit-id="adunit-a700a5cd5fffa271" ad-type="video" ad-theme="white" bindload="adLoad" binderror="adError" bindclose="adClose"></ad> -->
	</view>
</template>

<script setup>
import airportData from './dataAirport.js';

export default {
	data() {
		return {
			keyword: '',
			hot: [
				'北京大兴',
				'北京首都',
				'上海浦东',
				'上海虹桥',
				'广州',
				'深圳',
				'成都双流',
				'成都天府',
				'杭州',
				'武汉',
				'西安',
				'重庆',
				'青岛',
				'长沙',
				'南京',
				'厦门',
				'昆明',
				'大连',
				'天津',
				'郑州',
				'三亚',
				'济南',
				'福州'
			],
			hotResult: [
				'北京大兴',
				'北京首都',
				'上海浦东',
				'上海虹桥',
				'广州',
				'深圳',
				'成都双流',
				'成都天府',
				'杭州',
				'武汉',
				'西安',
				'重庆',
				'青岛',
				'长沙',
				'南京',
				'厦门',
				'昆明',
				'大连',
				'天津',
				'郑州',
				'三亚',
				'济南',
				'福州'
			],
			city: {},
			result: '',
			addDataAirport: {},
			bank: {
				abc: '农行',
				cmb: '招行',
				ibc: '工行',
				ccn: '建行',
				bocom: '交行',
				cgb: '广发',
				union: '银联'
			},
			staticType: `本表统计以精粹/经典白/工行大白/大山/白麒麟/水白等刷免大白官方宣传为基础，补充飞友肉测内容
				农行：航司白贵阳、喀什、西安不可用
				招行：经典白可扣点带人，钻石/百夫长可带1人，无条件带一人仅此一家
				工行：2000年费级别大白金即可，无论是否免收；重庆忙时仅本地卡可用
				建行：天津可电话预约贵宾楼，私银级可用重庆南京贵宾楼
				广发：增值白及以上可用北京广州贵宾楼
				交行：成都天府仅借记卡沃德扣点可进`,
			promptCip: `C：即为cip，大多需要自己托运，走粮仓或专用安检通道+休息室，银联大多提供cip
				V：贵宾楼（区域），小车送机，vip（远机位小车近机位步行的计入vip）
				H：饭点提供热食，不一定准确
				Y：规则要求提前预约，部分可现场预约或直接使用
				√/+1/+2：机场贵宾可用及可带同行成人数
				？：不确定，欢迎肉测补充和联系我`
		};
	},
	mounted() {
		this.addDataAirport = airportData.airportData;
		this.city = airportData.strAirportLocation;
	},
	methods: {
		change(e) {
			const hotLast = this.hot;
			if (!e) {
				this.hot = this.hotResult;
				return;
			}
			const allCity = Object.keys(this.city);
			const allCityFilterBefore = allCity.filter((item) => item.includes(e));
			const allCityFilter = allCityFilterBefore.map((item) => this.city[item]);
			if (this.hot) {
				this.hot = allCityFilter;
			}
			if (this.hot.length === 0) {
				this.hot = this.hotResult;
			}

			if (this.hot.length === 1) {
				this.result = this.hot[0];
			}
		},
		search(e) {
			this.result = e;
		}
	}
};
</script>
<style>
.item .el-form-item__label {
	color: #00050a;
	font-weight: 1000;
}
</style>
<style scoped>
.btn {
	width: 200px;
	height: 60px;
	/* color: #409EFF; */
	color: #ffffff;
	font-weight: 1000;
	font-size: 20px;
}
.header {
	display: flex;
	width: 100%;
	justify-content: center;
}
.headerButton {
	/* flex: 1; */
	width: 80%;
}
.textHeader {
	margin-left: 10px;
}
.midGuess {
	display: flex;
	flex-wrap: wrap;
	text-align: center;
}
.midGuessItem {
	text-align: center;
	margin: 2px 4px;
}
.bankContain {
	margin: 4px;
	display: flex;
	flex-wrap: wrap;
}
.bankItem {
	/* flex: 1; */
	width: 20%;
	border: #b2b2ad solid 2px;
	border-top: none;
	border-left: none;
	/* border-bottom: none; */
	padding: 2px;
	padding-bottom: 10px;
}
</style>
