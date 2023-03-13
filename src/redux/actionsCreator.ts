import {
  ADD_COMPONENT_TO_PLACEHOLDER,
  REMOVE_COMPONENT_FROM_PLACEHOLDER,
  SET_FIRST_OPERAND,
  SET_SECOND_OPERAND,
  SET_OPERATION,
  PERFORM_CALCULATION,
  CONSTRUCTOR_MODE,
  RUNTIME_MODE,
  DRAG_COMPONENT,
  DROP_ON_COMPONENT,
} from './actions'

interface IAddComponent {
  type: typeof ADD_COMPONENT_TO_PLACEHOLDER
  payload: string
}
interface IRemoveComponent {
  type: typeof REMOVE_COMPONENT_FROM_PLACEHOLDER
  payload: string
}
interface ISetFirstOperand {
  type: typeof SET_FIRST_OPERAND
  payload: string
}
interface ISetSecondOperand {
  type: typeof SET_SECOND_OPERAND
  payload: string
}
interface ISetOperation {
  type: typeof SET_OPERATION
  payload: string
}
interface IPerformCalculation {
  type: typeof PERFORM_CALCULATION
}
interface IConstructorMode {
  type: typeof CONSTRUCTOR_MODE
}
interface IRuntimeMode {
  type: typeof RUNTIME_MODE
}
interface IDragComponent {
  type: typeof DRAG_COMPONENT
  payload: string
}
interface IDropOnComponent {
  type: typeof DROP_ON_COMPONENT
  payload: string
}

export const removeComponent = (component: string) => {
  return {
    type: REMOVE_COMPONENT_FROM_PLACEHOLDER,
    payload: component,
  }
}
export const addComponent = (component: string) => {
  return {
    type: ADD_COMPONENT_TO_PLACEHOLDER,
    payload: component,
  }
}
export const setFirstOperand = (operand: string) => {
  return {
    type: SET_FIRST_OPERAND,
    payload: operand,
  }
}
export const setSecondOperand = (operand: string) => {
  return {
    type: SET_SECOND_OPERAND,
    payload: operand,
  }
}
export const setOperation = (operation: string) => {
  return {
    type: SET_OPERATION,
    payload: operation,
  }
}
export const performCalculation = () => {
  return {
    type: PERFORM_CALCULATION,
  }
}
export const runtimeModeOn = () => {
  return {
    type: RUNTIME_MODE,
  }
}
export const constructorModeOn = () => {
  return {
    type: CONSTRUCTOR_MODE,
  }
}
export const dragComponent = (componentName: string) => {
  return {
    type: DRAG_COMPONENT,
    payload: componentName,
  }
}
export const dropOnComponent = (componentName: string) => {
  return {
    type: DROP_ON_COMPONENT,
    payload: componentName,
  }
}

export type ActionTypes =
  | IAddComponent
  | IRemoveComponent
  | ISetFirstOperand
  | ISetSecondOperand
  | ISetOperation
  | IPerformCalculation
  | IRuntimeMode
  | IConstructorMode
  | IDragComponent
  | IDropOnComponent
