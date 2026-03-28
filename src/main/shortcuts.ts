import { BrowserWindow, globalShortcut } from 'electron'
import { OverlayController } from 'electron-overlay-window'

const goBackShortcut = 'Alt+Q'
const goNextShortcut = 'Alt+E'

export function registerShortcuts(window: BrowserWindow): void {
  globalShortcut.register(goBackShortcut, () => doIfFocused(() => window.webContents.send('back')))
  globalShortcut.register(goNextShortcut, () => doIfFocused(() => window.webContents.send('next')))
}

export function unregisterShortcuts() {
  globalShortcut.unregisterAll()
}

function doIfFocused(callback: () => void) {
  if (OverlayController.targetHasFocus) {
    callback()
  }
}
