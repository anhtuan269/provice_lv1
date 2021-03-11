import { createApp } from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(vueResource);
createApp(VueAxios, axios);
createApp(App).mount('#app')

