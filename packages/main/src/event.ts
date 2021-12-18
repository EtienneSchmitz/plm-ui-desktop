import { ipcMain } from 'electron';
import { dialog } from 'electron';
import Configuration from './configuration';

ipcMain.on('starter-folder', () => {
    const folder = dialog.showOpenDialogSync({ properties: ['openDirectory'] });

    if (folder == undefined) {
        return;
    }

    Configuration.register_new_workspace({
        path: folder[0],
        open: true,
    });

    // TODO : Put the folder path in the configuration

    // TODO : Open the main window with the folder path.
});
