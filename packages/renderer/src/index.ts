import type { IpcRendererEvent } from 'electron';
import type { InitOptions } from './../../shared/types/event/window';

import { TaskPlugin } from './plugins/tasks';

window.electron.once('app:init', (event: IpcRendererEvent, arg: InitOptions) => {
    arg;
});

const taskPlugin = new TaskPlugin();

taskPlugin.display();


