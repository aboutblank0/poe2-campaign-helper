import { useCallback, useEffect, useState } from 'react'
import { useAppContext } from './contexts/appContext'
import { CampaignStep, CampaignStepCard } from './components/CampaignStep'

// WIP
const steps: CampaignStep[] = [
  {
    id: 1,
    instruction: 'Go over there!'
  },
  {
    id: 2,
    instruction: 'Okay, now go back to town.'
  }
]

function App(): React.JSX.Element {
  const { hasFocus } = useAppContext()
  const [index, setIndex] = useState<number>(0)

  const handleBack = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const handleNext = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, steps.length - 1))
  }, [])

  // Register the events
  useEffect(() => {
    const unregisterBack = window.electron.ipcRenderer.on('back', handleBack)
    const unregisterNext = window.electron.ipcRenderer.on('next', handleNext)

    return () => {
      unregisterBack()
      unregisterNext()
    }
  }, [handleBack, handleNext])

  return (
    <div className={`main-container ${hasFocus ? 'focus' : ''}`}>
      <h1>{hasFocus ? 'FOCUSED' : 'NOT FOCUSED'}</h1>
      <CampaignStepCard {...steps[index]} />
    </div>
  )
}

export default App
