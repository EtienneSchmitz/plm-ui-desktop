import { createApp } from 'vue';
import App from '/@/App.vue';
import router from '/@/router';
import type { IpcRendererEvent } from 'electron';
import type { InitOptions } from './../../shared/types/event/window';


createApp(App)
.use(router)
.mount('#app');

window.electron.once('app:init', (event: IpcRendererEvent, arg: InitOptions) => {
    arg;
});
