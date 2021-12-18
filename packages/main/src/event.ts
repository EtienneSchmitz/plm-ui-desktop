import { ipcMain } from 'electron';
import { dialog } from 'electron';

ipcMain.on('starter-folder', () => {
    const folder = dialog.showOpenDialogSync({ properties: ['openDirectory'] });

    if (folder == undefined) {
        return;
    }

    // TODO : Put the folder path in the configuration

    // TODO : Open the main window with the folder path.
});
