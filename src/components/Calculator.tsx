import { useState, useEffect } from 'react'
import Display from './UI/Display'
import ArithmeticsButtons from './UI/ArithmeticsButtons'
import NumbersButtons from './UI/NumbersButtons'
import EqualsButton from './UI/EqualsButton'
import { IComponent } from '../redux/appReducer'
import { useTypedSelector } from '../hooks/useTypeSelector'

interface IComponentsDisable {
  displayIsDisabled: boolean
  arithmeticsIsDisabled: boolean
  numbersIsDisabled: boolean
  equalsIsDisabled: boolean
}

const Calculator = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const [inPlaceholder, setInPlaceholder] = useState<IComponent[]>([])
  const [componentsAreDisabled, setComponentsAreDisabled] =
    useState<IComponentsDisable>({
      displayIsDisabled: false,
      arithmeticsIsDisabled: false,
      numbersIsDisabled: false,
      equalsIsDisabled: false,
    })
  const { placeholderComponents, constructorMode } = useTypedSelector(
    (state) => state.appReducer
  )
  useEffect(() => {
    setIsHidden(!constructorMode)
    if (constructorMode) {
      setComponentsAreDisabled({
        displayIsDisabled: false,
        arithmeticsIsDisabled: false,
        numbersIsDisabled: false,
        equalsIsDisabled: false,
      })
    }
  }, [constructorMode])

  useEffect(() => {
    setInPlaceholder(placeholderComponents)
  }, [placeholderComponents])

  useEffect(() => {
    if (
      inPlaceholder.some((el) => el.component.includes('Display')) &&
      !componentsAreDisabled.displayIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        displayIsDisabled: true,
      })
    }
    if (
      !inPlaceholder.some((el) => el.component.includes('Display')) &&
      componentsAreDisabled.displayIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        displayIsDisabled: false,
      })
    }
    if (
      inPlaceholder.some((el) => el.component.includes('ArithmeticsButtons')) &&
      !componentsAreDisabled.arithmeticsIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        arithmeticsIsDisabled: true,
      })
    }
    if (
      !inPlaceholder.some((el) =>
        el.component.includes('ArithmeticsButtons')
      ) &&
      componentsAreDisabled.arithmeticsIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        arithmeticsIsDisabled: false,
      })
    }
    if (
      inPlaceholder.some((el) => el.component.includes('NumbersButtons')) &&
      !componentsAreDisabled.numbersIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        numbersIsDisabled: true,
      })
    }
    if (
      !inPlaceholder.some((el) => el.component.includes('NumbersButtons')) &&
      componentsAreDisabled.numbersIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        numbersIsDisabled: false,
      })
    }
    if (
      inPlaceholder.some((el) => el.component.includes('EqualsButton')) &&
      !componentsAreDisabled.equalsIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        equalsIsDisabled: true,
      })
    }
    if (
      !inPlaceholder.some((el) => el.component.includes('EqualsButton')) &&
      componentsAreDisabled.equalsIsDisabled
    ) {
      setComponentsAreDisabled({
        ...componentsAreDisabled,
        equalsIsDisabled: false,
      })
    }
  }, [inPlaceholder])

  return (
    <div
      className={isHidden ? ['calculator', 'hidden'].join(' ') : 'calculator'}
    >
      <Display draggable disabled={componentsAreDisabled.displayIsDisabled} />
      <ArithmeticsButtons
        draggable
        disabled={componentsAreDisabled.arithmeticsIsDisabled}
      />
      <NumbersButtons
        draggable
        disabled={componentsAreDisabled.numbersIsDisabled}
      />
      <EqualsButton
        draggable
        disabled={componentsAreDisabled.equalsIsDisabled}
      />
    </div>
  )
}

export default Calculator
