import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';
import router from './router/index';

const app = createApp(App);

app.use(router);
app.use(store);

app.config.unwrapInjectedRef = true;

app.mount('#app');
