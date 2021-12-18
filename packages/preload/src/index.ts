/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge } from 'electron';

import type { BinaryLike } from 'crypto';
import { createHash } from 'crypto';

import { ipcRenderer } from 'electron';

/**
 * Expose Environment versions.
 * @example
 * @deprecated
 * console.log( window.versions )
 */
contextBridge.exposeInMainWorld('versions', process.versions);

/**
 * Safe expose node.js API
 * @example
 * @deprecated
 * window.nodeCrypto('data')
 */
contextBridge.exposeInMainWorld('nodeCrypto', {
    sha256sum(data: BinaryLike) {
        const hash = createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    },
});

/**
 * Safe expose electron API
 * @see https://electronjs.org/docs/api/ipc-renderer
 */
contextBridge.exposeInMainWorld('electron', {
    send: (channel: string, ...args: any[]) => {
        ipcRenderer.send(channel, ...args);
    },
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => {
        ipcRenderer.on(channel, listener);
    },
    once: (channel: string, listener: (event: any, ...args: any[]) => void) => {
        ipcRenderer.once(channel, listener);
    },
});
