import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import echarts from 'echarts';
import axios from 'axios';
import { messages } from './common/js/i18n';
import 'element-ui/lib/theme-chalk/index.css'; 
import './assets/css/icon.css';
import './common/js/directives';
import './assets/css/flex.css';
import 'babel-polyfill';
import'./assets/css/iconfont.css';

import BaiduMap from 'vue-baidu-map';
Vue.prototype.$echarts = echarts
Vue.use(BaiduMap,{
    ak:'Urn714VWzHxi6bWtdKWAgHqPnGiLGjGL'
})
Vue.prototype.$axios=axios
Vue.config.productionTip = false;
// Vue.use(VueI18n);

Vue.use(ElementUI, {
    size: 'small'
});
// const i18n = new VueI18n({
//     locale: 'zh',
//     messages
// });

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
    // document.title = `${to.meta.title} `;
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin' ? next() : next('/403');
    // } else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
            // next();
        // }
    // }
// });

new Vue({
    router,
    // i18n,
    render: h => h(App)
}).$mount('#app')

