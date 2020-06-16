import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import util from './util/judge'
import Vant from 'vant';
import 'vant/lib/index.css';
import Url from './util/url'
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.util = util;
Vue.prototype.Url = Url;

Vue.prototype.query = function (val) {
    return this.$route.query[val]
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
