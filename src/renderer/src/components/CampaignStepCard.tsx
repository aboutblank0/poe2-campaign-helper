import './../assets/campaignstep.css'

import { useAppContext } from '@renderer/contexts/appContext'
import { renderSmartStep } from '@renderer/util/campaignStepParser'
import { useLayoutEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'

export interface CampaignStepGroup {
  order: number
  zone: string
  steps: CampaignStep[]
}

interface CampaignStep {
  instruction: string
  reward?: string
  optional?: boolean
}

const DEFAULT_STEP_CARD_WIDTH = 300
const DEFAULT_STEP_CARD_HEIGHT = 200
const MIN_STEP_CARD_WIDTH = 100
const MIN_STEP_CARD_HEIGHT = 100

const getDefaultPosition = () => ({
  x: Math.round((window.innerWidth - DEFAULT_STEP_CARD_WIDTH) / 2),
  y: Math.round(window.innerHeight - DEFAULT_STEP_CARD_HEIGHT)
})

export const CampaignStepCard = (step: CampaignStepGroup) => {
  const { hasFocus } = useAppContext()
  const [defaultPosition, setDefaultPosition] = useState(getDefaultPosition())

  useLayoutEffect(() => {
    const handleResize = () => setDefaultPosition(getDefaultPosition())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: DEFAULT_STEP_CARD_WIDTH,
        height: DEFAULT_STEP_CARD_HEIGHT
      }}
      minHeight={MIN_STEP_CARD_HEIGHT}
      minWidth={MIN_STEP_CARD_WIDTH}
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
      bounds="parent"
    >
      <div className={`campaign-step-card ${hasFocus ? 'focus' : ''}`}>
        <div className="campaign-step-card-inner">
          <CampaignStepGroupComponent step={step} />
        </div>
      </div>
    </Rnd>
  )
}

const CampaignStepGroupComponent: React.FC<{ step: CampaignStepGroup }> = ({ step }) => {
  return (
    <section className="campaign-step-group">
      <p className="campaign-step-group__zone">{step.zone}</p>
      <ol className="campaign-step-group__list">
        {step.steps.map((item, idx) => (
          <li className="campaign-step" key={idx}>
            <div className="campaign-step__instruction">
              {item.optional ? '(Optional) ' : ''}
              {renderSmartStep(item.instruction)}
            </div>
            {item.reward && (
              <div className="campaign-step__reward">
                <span className="campaign-step__reward-label">Reward:</span>{' '}
                {renderSmartStep(item.reward)}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
