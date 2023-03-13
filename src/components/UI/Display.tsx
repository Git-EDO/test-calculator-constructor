import React, { FC, useState, useEffect } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'
import { useDispatch } from 'react-redux'
import { removeComponent, setFirstOperand } from '../../redux/actionsCreator'
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { ICalculator } from '../../redux/appReducer'

interface DisplayProps {
  draggable: boolean
  disabled?: boolean
}

const Display: FC<DisplayProps> = ({ draggable, disabled }) => {
  const { calculator, constructorMode } = useTypedSelector(
    (state) => state.appReducer
  )
  const [mode, setMode] = useState<boolean>(constructorMode)
  const [displayState, setDisplayState] = useState<string>('0')
  const [calc, setCalc] = useState<ICalculator>(calculator)
  const dispatch = useDispatch()

  useEffect(() => {
    setMode(constructorMode)
  }, [constructorMode])

  const onDoubleClickHandler = () => {
    if (mode) {
      dispatch(removeComponent('<Display/>'))
    }
  }

  useEffect(() => {
    setCalc(calculator)
  }, [calculator])

  useEffect(() => {
    if (calc.y === '' && calc.sign === '' && calc.x === '') {
      setDisplayState('0')
    }
    if (
      (calc.y === '' && calc.sign === '' && calc.x !== '') ||
      (calc.y === '' && calc.sign === '' && calc.summary !== '')
    ) {
      let sum = String(calc.x)
      if (+calc.x < 1 && +calc.x > -1) {
        sum = String(Number(+sum).toFixed(6))
      }
      if (sum.includes('.')) {
        sum = sum.replace('.', ',')
      }
      if (sum.length > 7) {
        sum = sum.slice(0, 10)
      }
      if (sum === 'Infinity') {
        return setDisplayState('Ошибка')
      }
      setDisplayState(sum)
    }
    if (calc.y !== '' && calc.sign !== '' && calc.x !== '') {
      setDisplayState(calc.y.includes('.') ? calc.y.replace('.', ',') : calc.y)
    }
    if (calc.summary !== '' && calc.x === '') {
      let sum = String(calc.summary)
      if (sum.includes('.')) {
        sum = sum.replace('.', ',')
      }
      if (sum.length > 8) {
        sum = sum.slice(0, 10)
      }
      if (sum === 'Infinity') {
        return setDisplayState('Ошибка')
      }
      setDisplayState(sum)
    }
  }, [calc])

  return (
    <div
      className={
        disabled ? ['display-wrapper', 'disabled'].join(' ') : 'display-wrapper'
      }
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        dragStartHandler(e, 'Display')
      }
      onDoubleClick={onDoubleClickHandler}
    >
      <div className="display">{displayState}</div>
    </div>
  )
}

export default Display
