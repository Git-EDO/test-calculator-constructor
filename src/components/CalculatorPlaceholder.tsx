import React, { useState } from 'react'
import ArithmeticsButtons from './UI/ArithmeticsButtons'
import NumbersButtons from './UI/NumbersButtons'
import EqualsButton from './UI/EqualsButton'
import Display from './UI/Display'
import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'

interface CustomComponent {
  component: string
  order: number
}

const CalculatorPlaceholder = () => {
  const [elems, setElems] = useState<CustomComponent[]>([])
  const [isOver, setIsOver] = useState<boolean>(false)

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    elems.length < 4 ? setIsOver(true) : setIsOver(false)
  }
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOver(false)
  }
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const element = e.dataTransfer.getData('text')
    const hasElement = elems.some((el) => el.component === element)
    setElems(
      hasElement
        ? elems
        : [...elems, { component: element, order: elems.length + 1 }]
    )
    setIsOver(false)
  }

  const sortElements = () => {
    const display = elems.find((el) => el.component === 'Display')
    if (display && display.order !== 0) {
      elems.forEach((el) => el.order++)
      display.order = 0
      return [...elems.sort((a, b) => (a.order > b.order ? +1 : -1))]
    }
    return elems
  }

  return (
    <div
      className="calculator-placeholder"
      style={
        isOver
          ? { backgroundColor: '#F0F9FF' }
          : { backgroundColor: 'transparent' }
      }
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      {!elems.length && (
        <div className="placeholder-text">
          <ImageIcon />
          <p>Перетащите сюда</p>
          <p>любой элемент из левой панели</p>
        </div>
      )}
      {sortElements().map((el) => {
        switch (el.component) {
          case 'Display':
            return <Display draggable={false} key={el.order} />
          case 'NumbersButtons':
            return <NumbersButtons draggable key={el.order} />
          case 'EqualsButton':
            return <EqualsButton draggable key={el.order} />
          default:
            return <ArithmeticsButtons draggable key={el.order} />
        }
      })}
    </div>
  )
}

export default CalculatorPlaceholder
