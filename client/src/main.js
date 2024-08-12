import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSmoothScroll from 'vue3-smooth-scroll'
import axios from 'axios'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PrimeVue from 'primevue/config';

import './assets/main.css'

import Lara from '@/presets/lara';      //import preset  

const app = createApp(App)

// app.config.globalProperties.$hostname = 'http://localhost:3001/v1'
// app.config.globalProperties.$hostname = 'http://192.168.0.19:3001/v1'
app.config.globalProperties.$hostname = 'http://164.90.221.35:3001/v1'
app.config.globalProperties.$apiKey = '0799f5c9-6478-4f7a-b6b5-9bb59a8f05a7'

axios.defaults.headers.common['Authorization'] = app.config.globalProperties.$apiKey

app.use(VueSmoothScroll)

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset        
});

app.component('Header', Header)
app.component('Footer', Footer)

app.use(router)

app.mount('#app')
