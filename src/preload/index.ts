import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { exampleApi } from '../main/exampleApi'

try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('example', exampleApi)
} catch (error) {
  console.error(error)
}
