import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ToastPlugin from './plugins/toast'
//让components/common/index 执行
import 'components/common'

//全局注册
import VueAwesomeSwiper from 'vue-awesome-swiper'
import xxx from 'assets/img/common/placeholder.png'
// require styles
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // loading:'assets/img/common/placeholder.png',
    loading:require('assets/img/common/placeholder.png'),//配置占位图片
    // loading:xxx
})

//把vue实例放在Vue的prototype
Vue.prototype.$bus = new Vue()




Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(ToastPlugin)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

