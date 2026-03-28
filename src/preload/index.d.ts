import { ElectronAPI } from '@electron-toolkit/preload'
import { ExampleAPI } from '../main/exampleApi'

declare global {
  interface Window {
    electron: ElectronAPI
    example: ExampleAPI
  }
}
