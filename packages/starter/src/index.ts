const button = document.getElementById("open_folder");

button?.addEventListener("click", () => {
    window.ipcRenderer.send('starter-folder');
});


export {};
