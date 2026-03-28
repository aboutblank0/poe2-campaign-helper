import { globalShortcut } from 'electron'
import { OverlayController } from 'electron-overlay-window'

const goBackShortcut = 'Alt+Q'
const goNextShortcut = 'Alt+E'
const toggleOverlayShortcut = 'Alt+R'

export class GameOverlayWindow {
  private _window: Electron.BrowserWindow

  private _gameFocused: boolean = false
  private _overlayFocused: boolean = false

  private _shortcutsRegistered: boolean = false

  constructor(window: Electron.BrowserWindow) {
    this._window = window
    this._gameFocused = false
    this._overlayFocused = false
  }

  public attach(title: string) {
    OverlayController.attachByTitle(this._window, title)
    this.registerEvents()
  }

  private registerEvents() {
    OverlayController.events.on('focus', () => this.gameFocusChange(true))
    OverlayController.events.on('blur', () => this.gameFocusChange(false))

    this._window.on('focus', () => this.overlayFocusChange(true))
    this._window.on('blur', () => this.overlayFocusChange(false))
  }

  private updateShortcuts() {
    const focused = this._gameFocused || this._overlayFocused
    if (focused && !this._shortcutsRegistered) {
      this.registerShortcuts()
    } else if (!focused && this._shortcutsRegistered) {
      this.unregisterShortcuts()
    }
  }

  private registerShortcuts() {
    globalShortcut.register(goBackShortcut, () => this._window.webContents.send('back'))
    globalShortcut.register(goNextShortcut, () => this._window.webContents.send('next'))
    globalShortcut.register(toggleOverlayShortcut, () => this.toggleOverlayFocus())

    this._shortcutsRegistered = true
  }

  private toggleOverlayFocus() {
    if (this._overlayFocused) {
      OverlayController.focusTarget()
      this._window.webContents.send('blur')
    } else {
      OverlayController.activateOverlay()
      this._window.webContents.send('focus')
    }
  }

  private unregisterShortcuts() {
    this._shortcutsRegistered = false
    globalShortcut.unregisterAll()
  }

  private gameFocusChange(value: boolean) {
    this._gameFocused = value
    this.updateShortcuts()
  }

  private overlayFocusChange(value: boolean) {
    this._overlayFocused = value
    this.updateShortcuts()
  }
}
