
function myConfig(){
	if(process.env.NODE_ENV === 'development'){
	    console.log('开发环境 config')
	}else{
	    console.log('生产环境')
		console.log=()=>{}
	}
}
export default myConfig;