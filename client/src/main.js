import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueSmoothScroll from 'vue3-smooth-scroll';
import axios from 'axios';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import PrimeVue from 'primevue/config';

import './assets/main.css';

import Lara from '@/presets/lara';

const app = createApp(App);

app.config.globalProperties.$hostname = import.meta.env.VITE_API_URL;

// Access the environment variable with Vite
app.config.globalProperties.$apiKey = import.meta.env.VITE_API_KEY;

axios.defaults.headers.common['Authorization'] = app.config.globalProperties.$apiKey;

app.use(VueSmoothScroll);

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});

app.component('Header', Header);
app.component('Footer', Footer);

app.use(router);

app.mount('#app');
