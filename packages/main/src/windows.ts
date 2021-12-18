import type { Workspace } from './configuration';
import { BrowserWindow } from 'electron';
import { join } from 'path';
import { URL } from 'url';

interface SaveWindows {
    name: string,
    window: BrowserWindow
}

const windows = [] as SaveWindows[];
let index = 0;

export const createStarter = async (development: boolean) => {
    const w = new BrowserWindow({
        show: true, // Use 'ready-to-show' event to show window
        webPreferences: {
            nativeWindowOpen: true,
            webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
            preload: join(__dirname, '../../preload/dist/index.cjs'),
        },
    });

    windows.push({ name: 'starter', window: w });

    if (!development) {
        w.removeMenu();
    }
    const starterUrl =
        development && import.meta.env.VITE_STARTER_SERVER_URL !== undefined
            ? import.meta.env.VITE_STARTER_SERVER_URL
            : new URL(
                '../starter/dist/index.html',
                'file://' + __dirname,
            ).toString();

    await w.loadURL(starterUrl);
};

export const createMainWindow = async (development: boolean, workspace: Workspace) => {
    const w = new BrowserWindow({
        show: true, // Use 'ready-to-show' event to show window
        webPreferences: {
            nativeWindowOpen: true,
            webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
            preload: join(__dirname, '../../preload/dist/index.cjs'),
        },
    });

    w.maximize();

    windows.push({ name: 'main_' + index++, window: w });

    /**
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test
     */
    const pageUrl =
        development && import.meta.env.VITE_DEV_SERVER_URL !== undefined
            ? import.meta.env.VITE_DEV_SERVER_URL
            : new URL(
                '../renderer/dist/index.html',
                'file://' + __dirname,
            ).toString();

    console.log(pageUrl);

    await w.loadURL(pageUrl);

    w.webContents.once('dom-ready', () => {
        console.log("test");
        w.webContents.send('app:init', { path: workspace.path });
    });
};

export function get_windows(): SaveWindows[] {
    return windows;
}
