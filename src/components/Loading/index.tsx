import React from 'react'
import { Oval } from '@agney/react-loading'

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        inset: 0,
        background: 'var(--white)',
        zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white'
      }}
    >
      <div style={{ width: 50, height: 50 }}>
        <Oval />
      </div>
    </div>
  )
}

export default Loading
