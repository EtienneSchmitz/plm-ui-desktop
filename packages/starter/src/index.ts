const button = document.getElementById('open_folder');

button?.addEventListener('click', () => {
    window.electron.send('starter-folder');
});


export {};
