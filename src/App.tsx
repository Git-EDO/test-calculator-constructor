import React, { useState } from 'react'
import HeaderButtons from './components/HeaderButtons'
import Calculator from './components/Calculator'
import CalculatorPlaceholder from './components/CalculatorPlaceholder'
import './index.css'

function App() {
  return (
    <div className="App">
      <HeaderButtons />
      <div className="wrapper">
        <Calculator />
        <CalculatorPlaceholder />
      </div>
    </div>
  )
}

export default App
