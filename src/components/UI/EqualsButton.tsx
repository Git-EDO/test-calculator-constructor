import React, { FC, useState, useEffect } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'
import { useDispatch } from 'react-redux'
import {
  performCalculation,
  removeComponent,
  setFirstOperand,
  setSecondOperand,
  setOperation,
  dropOnComponent,
  dragComponent,
} from '../../redux/actionsCreator'
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { ICalculator } from '../../redux/appReducer'

interface EqualsButtonProps {
  draggable: boolean
  disabled?: boolean
}

const EqualsButton: FC<EqualsButtonProps> = ({ draggable, disabled }) => {
  const { calculator, constructorMode } = useTypedSelector(
    (state) => state.appReducer
  )
  const [mode, setMode] = useState<boolean>(constructorMode)
  const [calc, setCalc] = useState<ICalculator>(calculator)
  const dispatch = useDispatch()

  useEffect(() => {
    setMode(constructorMode)
  }, [constructorMode])

  useEffect(() => {
    setCalc(calculator)
  }, [calculator])

  const onDoubleClickHandler = () => {
    if (mode) {
      dispatch(removeComponent('<EqualsButton/>'))
    }
  }

  const clickHandler = () => {
    if (calc.x !== '' && calc.sign !== '' && calc.y !== '') {
      dispatch(performCalculation())
    }
  }

  const elemDropHandler = () => {
    dispatch(dropOnComponent(`EqualsButton`))
  }

  return (
    <div
      className={disabled ? ['equals', 'disabled'].join(' ') : 'equals'}
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        dragStartHandler(e, 'EqualsButton')
        dispatch(dragComponent('EqualsButton'))
      }}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
        dispatch(dragComponent(''))
      }}
      onDrop={elemDropHandler}
      onDoubleClick={onDoubleClickHandler}
    >
      <button onClick={clickHandler}>=</button>
    </div>
  )
}

export default EqualsButton
