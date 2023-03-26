/* eslint-disable @typescript-eslint/restrict-plus-operands */
import styled from 'styled-components'

export const AlertAction = styled.div.attrs(props => props)`
  width: 100%;
  padding: 16px;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 0 0 4px 4px;
  transition: 0.2s ease;
  cursor: pointer;
`

interface AlertBallonProps {
  type: string
  active?: boolean
}

export const AlertBallon = styled.div<AlertBallonProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 15px;
  right: 15px;
  border-radius: 4px;
  background: white;
  max-width: 300px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);

  transform: translate(${props => (props.active ? 0 : '330px')}, 0);
  opacity: ${props => (props.active ? 1 : 0)};
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  transition: 0.5s ease;
  z-index: 9999;

  @media (max-width: 600px) {
    right: 0;
    left: 0;
    bottom: 15px;
    transform: translateX(0);
  }

  ${AlertAction} {
    background: ${props => (props.type === 'error' ? '#ee5353' : '#00c851')};

    &:hover {
      background: ${props => (props.type === 'error' ? '#d04343' : '#00a843')};
    }
  }
`

export const AlertTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 16px 16px 5px 16px;
  font-size: 22px;
  color: var(--dark-gray);
`

export const AlertContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 5px 16px 16px 16px;
  font-size: 14px;
  color: var(--medium-gray);
`

export const ProgressBallon = styled.div<AlertBallonProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 15px;
  right: 15px;
  border-radius: 4px;
  background: white;
  max-width: 400px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  transform: translate(${props => (props.active ? 0 : '330px')}, 0);
  opacity: ${props => (props.active ? 1 : 0)};
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  transition: 0.5s ease;
  z-index: 9999;

  @media (max-width: 600px) {
    right: 0;
    left: 0;
    bottom: 15px;
    transform: translateX(0);
  }
`

export const ProgressContent = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 28px;
`

export const ProgressIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: var(--primary);
  color: white;
`

export const ProgressText = styled.div`
  margin-left: 14px;
  > h3 {
    font-size: 1em;
    color: var(--primary);
  }
  > span {
    font-size: 0.8em;
    color: var(--dark-gray);
  }
`

export const ProgressAction = styled.button`
  font-size: 0.9em;
  cursor: pointer;
  font-weight: 600;
  color: var(--primary);
  margin-left: 28px;
`

export const ProgressBar = styled.div``

interface ProgressIndicatorProps {
  percentage: number
}

export const ProgressIndicator = styled.div<ProgressIndicatorProps>`
  transition: 0.2s ease;
  height: 4px;
  border-radius: 4px;
  width: ${props => 'calc(100% - ' + (100 - props.percentage) + '%)'};
  background-color: var(--primary);
`
