
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import FileUpload from './components/FileUpload.vue';
import FileDownload from './components/FileDownload.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/tailwind.css'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false;
const routes =[
  { path:'/FileDownload', component:FileDownload},
  { path:'/FileUpload', component:FileUpload}
];

const router = new VueRouter({
  routes
});
new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');
