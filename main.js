import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
import store from './store';
import myConfig from './config.js';

myConfig();
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
// 加载js工具插件
import jsTools from "uni_modules/leven-js-tools/index.js"
Vue.use(jsTools);

// 自定义插件引用
uni.$v = uni.$lv.request

const app = new Vue({
	store,
    ...App
})

app.$mount()
