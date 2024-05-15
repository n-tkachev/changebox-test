import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast, { POSITION } from "vue-toastification";
import 'vue-toastification/dist/index.css'

import i18n from '@/i18n/i18n'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(Toast, { position: POSITION.TOP_CENTER })

app.mount('#app')
