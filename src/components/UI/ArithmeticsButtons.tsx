import React, { FC, useEffect, useState } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'
import { useDispatch } from 'react-redux'
import {
  dragComponent,
  dropOnComponent,
  removeComponent,
} from '../../redux/actionsCreator'
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { ICalculator } from '../../redux/appReducer'
import { setOperation } from '../../redux/actionsCreator'

interface ArithmeticsButtonsProps {
  draggable: boolean
  disabled?: boolean
}

const ArithmeticsButtons: FC<ArithmeticsButtonsProps> = ({
  draggable,
  disabled,
}) => {
  const operations = ['/', 'X', '-', '+']
  const { calculator, constructorMode, currentDraggedComponent } =
    useTypedSelector((state) => state.appReducer)
  const [mode, setMode] = useState<boolean>(constructorMode)
  const [calc, setCalc] = useState<ICalculator>(calculator)
  const dispatch = useDispatch()

  const onDoubleClickHandler = () => {
    if (mode) {
      dispatch(removeComponent('<ArithmeticsButtons/>'))
    }
  }

  useEffect(() => {
    setMode(constructorMode)
  }, [constructorMode])

  useEffect(() => {
    setCalc(calculator)
  }, [calculator])

  const clickHandler = (index: number) => {
    if (
      (calc.x !== '' && calc.sign === '') ||
      (calc.x !== '' && calc.sign !== '' && calc.y === '')
    ) {
      dispatch(setOperation(`${operations[index]}`))
    }
  }

  const elemDropHandler = () => {
    dispatch(dropOnComponent(`ArithmeticsButtons`))
  }

  return (
    <div
      className={
        disabled ? ['arithmetics', 'disabled'].join(' ') : 'arithmetics'
      }
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        dragStartHandler(e, 'ArithmeticsButtons')
        dispatch(dragComponent('ArithmeticsButtons'))
      }}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
        dispatch(dragComponent(''))
      }}
      onDrop={elemDropHandler}
      onDoubleClick={onDoubleClickHandler}
    >
      {operations.map((button, index) => (
        <button key={button} onClick={() => clickHandler(index)}>
          {button}
        </button>
      ))}
    </div>
  )
}

export default ArithmeticsButtons
