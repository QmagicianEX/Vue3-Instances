import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { naiveUI } from './utils/naiveUI'

createApp(App).use(router).use(naiveUI).mount('#app')
