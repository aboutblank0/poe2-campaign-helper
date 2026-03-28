import React, { useEffect } from 'react'

type AppContextType = {
  hasFocus: boolean
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined)

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasFocus, setHasFocus] = React.useState<boolean>(false)

  useEffect(() => {
    const unregisterFocus = window.electron.ipcRenderer.on('focus', () => setHasFocus(true))
    const unregisterBlur = window.electron.ipcRenderer.on('blur', () => setHasFocus(false))

    return () => {
      unregisterFocus()
      unregisterBlur()
    }
  }, [])

  const value: AppContextType = {
    hasFocus
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider

export const useAppContext = (): AppContextType => {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}
