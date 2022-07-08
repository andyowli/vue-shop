import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import * as echarts from 'echarts'
import './assets/css/reset.css'
import './element/element';

// console.log(echarts]
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  // console.log(to);
  if(to.matched.some(ele => ele.meta.isLogin)){
    let user = store.state.userinfo;
    // console.log(user);
    if(user){
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
