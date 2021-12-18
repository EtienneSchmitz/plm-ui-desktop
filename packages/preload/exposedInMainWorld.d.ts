interface Window {
    /**
     * Expose Environment versions.
     * @example
     * @deprecated
     * console.log( window.versions )
     */
    readonly versions: NodeJS.ProcessVersions;
    /**
     * Safe expose node.js API
     * @example
     * @deprecated
     * window.nodeCrypto('data')
     */
    readonly nodeCrypto: { sha256sum(data: import("crypto").BinaryLike): string; };
    /**
     * Safe expose electron API
     * @see https://electronjs.org/docs/api/ipc-renderer
     */
    readonly electron: { send: (channel: string, ...args: any[]) => void; on: (channel: string, listener: (event: any, ...args: any[]) => void) => void; once: (channel: string, listener: (event: any, ...args: any[]) => void) => void; };
}
