import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import getStore from './store';

Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
    router,
    store: new Vuex.Store(getStore()),
    render: (h) => h(App),
}).$mount('#app');
