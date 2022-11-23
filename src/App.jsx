import { useState } from 'react'

import Buttons from './components/Buttons/Buttons'
import Screen from './components/Screen/Screen'

import './App.scss'

function App() {
  return (
    <div className="app__container">
        <div className='device__container'>
            <Screen url={'ws://172.25.16.1:6080/websockify?token=SA1'}/>
            <Buttons/>
        </div>
    </div>
  )
}

export default App
