
import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import mitt from 'mitt'
import store from './store'
import toast from "./components/common/toast/index.js"

const app=createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$bus = mitt();
app.config.globalProperties.$toast = toast;
app.mount('#app')
