let configURL = {};
let url = "https://sgs.jackjam.xyz/";
url = "https://7367-sgs-5gwi2f826ca612c8-1304922515.tcb.qcloud.la/";
if(process.env.NODE_ENV === 'development'){
	    console.log('开发环境 config');
		configURL ={
			luckbox: url + "luckboxTest.js",
			allDateUsed:  url + "allDataUsedTest.json",
			dreanHallData: url + "dreanHallDataTest.json",
			dreanHallDataAdd: url + "dreanHallDataOldTest.json",
			
		}		
}else{
	console.log('生产环境')
	console.log=()=>{}
	configURL={
		luckbox: url + "test_data.json",
		allDateUsed:  url + "allDataUsed.json",
		dreanHallData:  url + "dreanHallData.json",
		dreanHallDataAdd: url + "dreanHallDataOld.json",
	}
}
export default configURL;