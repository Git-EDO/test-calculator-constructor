import React, { useState, useEffect } from 'react'
import ArithmeticsButtons from './UI/ArithmeticsButtons'
import NumbersButtons from './UI/NumbersButtons'
import EqualsButton from './UI/EqualsButton'
import Display from './UI/Display'
import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'
import { IComponent } from '../redux/appReducer'
import { useDispatch } from 'react-redux'
import { addComponent } from '../redux/actionsCreator'
import { useTypedSelector } from '../hooks/useTypeSelector'

const CalculatorPlaceholder = () => {
  const [mode, setMode] = useState<boolean>(false)
  const [elems, setElems] = useState<IComponent[]>([])
  const [isOver, setIsOver] = useState<boolean>(false)
  const dispatch = useDispatch()

  const { placeholderComponents, constructorMode } = useTypedSelector(
    (state) => state.appReducer
  )
  useEffect(() => {
    setMode(!constructorMode)
  }, [constructorMode])

  useEffect(() => {
    setElems(placeholderComponents)
  }, [placeholderComponents, constructorMode])

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
    const hasElement = elems.some((el) => el.component === `<${element}/>`)
    if (!hasElement) {
      dispatch(addComponent(`<${element}/>`))
    }
    setIsOver(false)
  }

  const sortElements = () => {
    const display = elems.find((el) => el.component === '<Display/>')
    if (display && display.order !== 0) {
      elems.forEach((el) => el.order++)
      display.order = 0
      return [...elems.sort((a, b) => (a.order > b.order ? +1 : -1))]
    }
    return [...elems.sort((a, b) => (a.order > b.order ? +1 : -1))]
  }

  return (
    <div
      className={
        mode
          ? ['calculator-placeholder', 'active'].join(' ')
          : 'calculator-placeholder'
      }
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
          case '<Display/>':
            return <Display draggable={false} key={el.component} />
          case '<NumbersButtons/>':
            return (
              <NumbersButtons
                draggable={mode ? false : true}
                key={el.component}
              />
            )
          case '<EqualsButton/>':
            return (
              <EqualsButton
                draggable={mode ? false : true}
                key={el.component}
              />
            )
          default:
            return (
              <ArithmeticsButtons
                draggable={mode ? false : true}
                key={el.component}
              />
            )
        }
      })}
    </div>
  )
}

export default CalculatorPlaceholder
