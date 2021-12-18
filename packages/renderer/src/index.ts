import {createApp} from 'vue';
import App from '/@/App.vue';
import router from '/@/router';

createApp(App)
  .use(router)
  .mount('#app');

window.ipcRenderer.once('app:init', (event, arg) => {
    console.log(arg);
});
