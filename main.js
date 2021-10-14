const { app, BrowserWindow } = require('electron');

async function createWindow() {
  const win = new BrowserWindow({
    width: 320,
    height: 480,
  });

  await win.loadFile('dist/index.html');
}

app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
