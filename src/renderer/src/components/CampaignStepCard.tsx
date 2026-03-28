import './../assets/campaignstep.css'

import { useAppContext } from '@renderer/contexts/appContext'
import { renderSmartStep } from '@renderer/util/campaignStepParser'
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

export const CampaignStepCard = (step: CampaignStepGroup) => {
  const { hasFocus } = useAppContext()

  // default position should be at the bottom middle of the screen
  const defaultX = window.innerWidth / 2 - 160 // 320 is the width of the card
  const defaultY = window.innerHeight - 220 // 200 is the height of the card + some margin

  return (
    <Rnd
      default={{ x: defaultX, y: defaultY, width: 320, height: 200 }}
      minHeight={100}
      minWidth={100}
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
