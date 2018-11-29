import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'

import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VeeValidate)

Vue.config.productionTip = false

// Check if browser supports service workers
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker
        .register('../biogenapp-sw.js')
        .then(function(registration) {
            console.log('Service Worker registered. Scope is : ', registration.scope)
        });
}

// Setup fake backend
import { configureBackend } from "./_helpers";
configureBackend()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
