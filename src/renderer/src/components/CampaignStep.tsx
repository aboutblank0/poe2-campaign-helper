import './../assets/campaignstep.css'

import { useAppContext } from '@renderer/contexts/appContext'
import { Rnd } from 'react-rnd'

export type CampaignStep = {
  id: number
  instruction: string
  imageUrl?: string
}

export const CampaignStepCard = (step: CampaignStep) => {
  const { hasFocus } = useAppContext()

  return (
    <Rnd
      default={{ x: 0, y: 0, width: 320, height: 200 }}
      minHeight={100}
      minWidth={100}
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
      bounds="parent"
    >
      <div className={`campaign-step ${hasFocus ? 'focus' : ''}`}>
        <div className="campaign-step-inner">
          <p>ID: {step.id}</p>
          <h1>{step.instruction}</h1>
        </div>
      </div>
    </Rnd>
  )
}
