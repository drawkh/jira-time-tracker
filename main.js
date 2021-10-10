import { app, BrowserWindow } from 'electron';

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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
