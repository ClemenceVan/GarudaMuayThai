import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSmoothScroll from 'vue3-smooth-scroll'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PrimeVue from 'primevue/config';

import './assets/main.css'

import Lara from '@/presets/lara';      //import preset  

const app = createApp(App)

app.use(VueSmoothScroll)

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset        
});

app.component('Header', Header)
app.component('Footer', Footer)

app.use(router)

app.mount('#app')
