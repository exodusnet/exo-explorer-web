import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import filter from "./filter/filter.js"
import config from './conf/config.js' //公共组件配置
import router from './router/router-conf.js'
import store from './store/index.js'
import VueClipboard from 'vue-clipboard2'
import prompt from './app/components/prompt_window.vue'
// import Qs from "qs"

// import utils from './conf/utils.js' //工具类
// import md5 from  './conf/md5.js' //md5加密函数
import "@/css/common.css" //公共样式
// Vue.prototype.utils=utils
Vue.prototype.axios=config.myAxios; //原型中加入axios,方便之后调用chainfin.one
// Vue.prototype.Qs
// Vue.config.productionTip = true;
// Vue.config.productionTip = false;
// Vue.config.silent = true

/**
 * 多语言
 */
import VueI18n from 'vue-i18n'
import langEn from "./lang/en"
import langZh from "./lang/zh"
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || "zh-CN",
  messages: {
    'en': langEn,
    'zh-CN': langZh,
  }
})

Vue.use(VueClipboard)
Vue.component('Prompt',prompt)
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	data: function(){
		return {

		}
	},
	template:"<App/>",
	components:{
		App
	}
})
