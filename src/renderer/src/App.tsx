import { useCallback, useEffect, useState } from 'react'
import { useAppContext } from './contexts/appContext'
import { CampaignStepCard, CampaignStepGroup } from './components/CampaignStepCard'
import campaignStepsData from './data/campaignSteps.json'

const campaignSteps = campaignStepsData as CampaignStepGroup[]
const STORAGE_KEY = 'poe2-campaign-helper-last-index'

function App(): React.JSX.Element {
  const { hasFocus } = useAppContext()
  const [index, setIndex] = useState<number>(() => {
    const savedIndex = localStorage.getItem(STORAGE_KEY)
    return savedIndex ? parseInt(savedIndex, 10) : 0
  })

  // Save the index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, index.toString())
  }, [index])

  const handleBack = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const handleNext = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, campaignSteps.length - 1))
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
      <CampaignStepCard {...campaignSteps[index]} />
    </div>
  )
}

export default App
