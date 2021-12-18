import { ipcMain } from 'electron';

ipcMain.on('tasks:init', (event, arg) => {
    console.log(arg);
    // TODO : Search for tasks.json on the workspace.
    // TODO : Load the tasks.json file.
    // TODO : Send tasks.json to the renderer.
    
});
