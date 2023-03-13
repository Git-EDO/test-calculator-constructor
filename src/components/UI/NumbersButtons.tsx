import React, { FC, useState, useEffect } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'
import { useDispatch } from 'react-redux'
import { removeComponent } from '../../redux/actionsCreator'
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { ICalculator } from '../../redux/appReducer'
import { setFirstOperand } from '../../redux/actionsCreator'
import { setSecondOperand } from '../../redux/actionsCreator'
import { dragComponent, dropOnComponent } from '../../redux/actionsCreator'

interface NumbersButtonsProps {
  draggable: boolean
  disabled?: boolean
}

const NumbersButtons: FC<NumbersButtonsProps> = ({ draggable, disabled }) => {
  const { calculator, constructorMode } = useTypedSelector(
    (state) => state.appReducer
  )
  const [mode, setMode] = useState<boolean>(constructorMode)
  const [calc, setCalc] = useState<ICalculator>(calculator)
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']
  const dispatch = useDispatch()

  useEffect(() => {
    setMode(constructorMode)
  }, [constructorMode])

  useEffect(() => {
    setCalc(calculator)
  }, [calculator])

  const onDoubleClickHandler = () => {
    if (mode) {
      dispatch(removeComponent('<NumbersButtons/>'))
    }
  }

  const clickHandler = (index: number) => {
    if (mode === false) {
      if (calc.x === 'Infinity') {
        return
      }
      if (calc.sign === '' && calc.y === '') {
        calc.x.includes('.')
          ? dispatch(setFirstOperand(index === 10 ? '' : `${numbers[index]}`))
          : dispatch(setFirstOperand(index === 10 ? '.' : `${numbers[index]}`))
      }
      if (calc.x !== '' && calc.sign !== '' && calc.summary === '') {
        calc.y.includes('.')
          ? dispatch(setSecondOperand(index === 10 ? '' : `${numbers[index]}`))
          : dispatch(setSecondOperand(index === 10 ? '.' : `${numbers[index]}`))
      }
    }
  }

  const elemDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(dropOnComponent(`NumbersButtons`))
  }

  return (
    <div
      className={disabled ? ['numbers', 'disabled'].join(' ') : 'numbers'}
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        dragStartHandler(e, 'NumbersButtons')
        dispatch(dragComponent('NumbersButtons'))
      }}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
        dispatch(dragComponent(''))
      }}
      onDrop={elemDropHandler}
      onDoubleClick={onDoubleClickHandler}
    >
      {numbers.map((button, index) => (
        <button key={button} onClick={() => clickHandler(index)}>
          {button}
        </button>
      ))}
    </div>
  )
}

export default NumbersButtons
