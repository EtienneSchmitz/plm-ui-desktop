import { app } from 'electron';
import './security-restrictions';
import './event';

import { createStarter, createMainWindow } from './windows';

import Configuration from './configuration';

const isSingleInstance = app.requestSingleInstanceLock();
const isDevelopment = import.meta.env.MODE === 'development';

if (!isSingleInstance) {
    app.quit();
    process.exit(0);
}

app.disableHardwareAcceleration();

// Install "Vue.js devtools"
if (isDevelopment) {
    app.whenReady()
        .then(() => import('electron-devtools-installer'))
        .then(({ default: installExtension, VUEJS3_DEVTOOLS }) =>
            installExtension(VUEJS3_DEVTOOLS, {
                loadExtensionOptions: {
                    allowFileAccess: true,
                },
            }),
        )
        .catch((e) => console.error('Failed install extension:', e));
}

const createApp = async () => {
    Configuration.init();

    const openWorkspace = Configuration.get_open_workspace();

    if (openWorkspace.length == 0) {
        await createStarter(isDevelopment);
    } else {
        openWorkspace.forEach(async (workspace) => {
            await createMainWindow(isDevelopment, workspace);
        });
    }
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady()
    .then(createApp)
    .catch((e) => console.error('Failed create window:', e));

// Auto-updates
if (import.meta.env.PROD) {
    app.whenReady()
        .then(() => import('electron-updater'))
        .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
        .catch((e) => console.error('Failed check updates:', e));
}
