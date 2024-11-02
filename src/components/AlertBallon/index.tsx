import React from 'react'
import {
  AlertBallon,
  AlertTitle,
  AlertContent,
  AlertAction,
  ProgressBallon,
  ProgressContent,
  ProgressIcon,
  ProgressText,
  ProgressAction,
  ProgressBar,
  ProgressIndicator
} from './styles'

import { AiOutlineCloudDownload } from 'react-icons/ai'

interface AlertBallonComponentProps {
  opened: boolean
  type: string
  title: string
  content: string
  closeFunction: () => void
  progressPercentage?: number
}

const AlertBallonComponent: React.FC<AlertBallonComponentProps> = ({
  opened,
  type,
  title,
  content,
  closeFunction,
  progressPercentage
}) => {
  return type !== 'progress' ? (
    <AlertBallon active={opened} type={type}>
      <AlertTitle>{title}</AlertTitle>
      <AlertContent>{content}</AlertContent>
      <AlertAction onClick={() => closeFunction()}>Dispensar</AlertAction>
    </AlertBallon>
  ) : (
    <ProgressBallon active={opened} type={type}>
      <ProgressContent>
        <ProgressIcon>
          <AiOutlineCloudDownload />
        </ProgressIcon>
        <ProgressText>
          <h3>{title}</h3>
          <span>{content}</span>
        </ProgressText>
        <ProgressAction onClick={() => closeFunction()}>
          Esconder
        </ProgressAction>
      </ProgressContent>
      <ProgressBar>
        <ProgressIndicator percentage={progressPercentage || 0} />
      </ProgressBar>
    </ProgressBallon>
  )
}

export default AlertBallonComponent
