import { useCallback, useEffect, useState } from 'react'

type CampaignStep = {
  id: number
  instruction: string
  imageUrl?: string
}

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
  const [index, setIndex] = useState<number>(0)

  const handleBack = useCallback(() => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const handleNext = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, steps.length - 1))
  }, [])

  // Register the events
  useEffect(() => {
    const back = window.electron.ipcRenderer.on('back', handleBack)
    const next = window.electron.ipcRenderer.on('next', handleNext)
    return () => {
      back()
      next()
    }
  }, [handleBack, handleNext])

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      <CampaignStepComponent {...steps[index]} />
      <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
        Send IPC
      </a>
    </div>
  )
}

const CampaignStepComponent = (step: CampaignStep) => {
  return (
    <div>
      <p>ID: {step.id}</p>
      <h1>{step.instruction}</h1>
    </div>
  )
}

export default App
