import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { URL } from 'url';
import './security-restrictions';

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
        .then(({ default: installExtension, VUEJS3_DEVTOOLS }) => installExtension(VUEJS3_DEVTOOLS, {
            loadExtensionOptions: {
                allowFileAccess: true,
            },
        }))
        .catch(e => console.error('Failed install extension:', e));
}

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        show: true, // Use 'ready-to-show' event to show window
        webPreferences: {
            nativeWindowOpen: true,
            webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
            preload: join(__dirname, '../../preload/dist/index.cjs'),
        },
    });

    mainWindow.maximize();

    /**
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test
     */
    const pageUrl = isDevelopment && import.meta.env.VITE_DEV_SERVER_URL !== undefined
        ? import.meta.env.VITE_DEV_SERVER_URL
        : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();


    await mainWindow.loadURL(pageUrl);
};



app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});


// app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
//     const regex = new RegExp('https://localhost:8080/*')

//     if (regex.test(url)) {
//         event.preventDefault()
//         callback(true)
//     } else {
//         callback(false)
//     }
// })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.whenReady()
    .then(createWindow)
    .catch((e) => console.error('Failed create window:', e));


// Auto-updates
if (import.meta.env.PROD) {
    app.whenReady()
        .then(() => import('electron-updater'))
        .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
        .catch((e) => console.error('Failed check updates:', e));
}