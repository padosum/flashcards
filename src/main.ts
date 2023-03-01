import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/style.scss';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import vuetify from '@/utils/setupVuetify';
import { markdownItPlugin } from '@/plugins/markdownit';
import { chartjsPlugin } from './plugins/chartjs';
import { createStore } from 'vuex';
import { store } from '@/store';

const vuexStore = createStore(store);

const app = createApp(App);
app.use(vuexStore);
app.use(router);
app.use(vuetify);
app.use(markdownItPlugin);
app.use(chartjsPlugin);

app.mount('#app');
