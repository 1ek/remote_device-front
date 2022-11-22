import { useState } from 'react'

import Buttons from './components/Buttons/Buttons'
import Screen from './components/Screen/Screen'

import './App.scss'

function App() {
  return (
    <div className="app__container">
        <div className='device__container'>
            <Screen url={'wss://123.11.11.2'}/>
            <Buttons/>
        </div>
    </div>
  )
}

export default App
