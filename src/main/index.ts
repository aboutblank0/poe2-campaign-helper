import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, is } from '@electron-toolkit/utils'
import { OVERLAY_WINDOW_OPTS } from 'electron-overlay-window'
import { GameOverlayWindow } from './gameOverlayWindow'

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      preload: join(__dirname, '../preload/index.js')
    },
    ...OVERLAY_WINDOW_OPTS
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  const mainWindow = createWindow()
  const gameWindow = new GameOverlayWindow(mainWindow)
  gameWindow.attach('Untitled - Notepad')

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // Open the DevTools in development mode.
  if (is.dev) {
    mainWindow.webContents.openDevTools({ mode: 'detach', activate: false })
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
