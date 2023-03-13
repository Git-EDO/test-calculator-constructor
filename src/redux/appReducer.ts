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
import { ActionTypes } from './actionsCreator'

export interface IComponent {
  component: string
  order: number
}

export interface ICalculator {
  x: string
  y: string
  sign: ''
  summary: string
}

export interface InitialState {
  constructorMode: boolean
  placeholderComponents: IComponent[]
  calculator: ICalculator
  currentDraggedComponent: string
  currentDropOnComponent: string
}

const initialState = {
  constructorMode: true,
  placeholderComponents: [],
  currentDraggedComponent: '',
  currentDropOnComponent: '',
  calculator: {
    x: '',
    y: '',
    sign: '',
    summary: '',
  },
}

export const appReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ADD_COMPONENT_TO_PLACEHOLDER:
      return {
        ...state,
        placeholderComponents: [
          ...state.placeholderComponents,
          {
            component: action.payload,
            order: state.placeholderComponents.length,
          },
        ],
      }
    case REMOVE_COMPONENT_FROM_PLACEHOLDER:
      return {
        ...state,
        placeholderComponents: [...state.placeholderComponents].filter(
          (el: IComponent) => el.component !== action.payload
        ),
      }
    case SET_FIRST_OPERAND:
      return {
        ...state,
        calculator: {
          ...state.calculator,
          x: state.calculator.x + action.payload,
        },
      }
    case SET_SECOND_OPERAND:
      return {
        ...state,
        calculator: {
          ...state.calculator,
          y: state.calculator.y + action.payload,
        },
      }
    case SET_OPERATION:
      return {
        ...state,
        calculator: {
          ...state.calculator,
          sign: action.payload,
          summary: '',
        },
      }
    case PERFORM_CALCULATION:
      return {
        ...state,
        calculator: {
          ...state.calculator,
          summary: String(
            state.calculator.sign === '+'
              ? +state.calculator.x + +state.calculator.y
              : state.calculator.sign === '-'
              ? +state.calculator.x - +state.calculator.y
              : state.calculator.sign === '/'
              ? +state.calculator.x / +state.calculator.y
              : +state.calculator.x * +state.calculator.y
          ),
          x: String(
            state.calculator.sign === '+'
              ? +state.calculator.x + +state.calculator.y
              : state.calculator.sign === '-'
              ? +state.calculator.x - +state.calculator.y
              : state.calculator.sign === '/'
              ? +state.calculator.x / +state.calculator.y
              : +state.calculator.x * +state.calculator.y
          ),
          y: '',
          sign: '',
        },
      }
    case CONSTRUCTOR_MODE:
      return {
        ...state,
        constructorMode: true,
        placeholderComponents: [],
        calculator: {
          x: '',
          y: '',
          sign: '',
          summary: '',
        },
      }
    case RUNTIME_MODE:
      return {
        ...state,
        constructorMode: false,
      }
    case DRAG_COMPONENT:
      return {
        ...state,
        currentDraggedComponent: action.payload,
      }
    case DROP_ON_COMPONENT:
      const droppedIndex: number = state.placeholderComponents.findIndex(
        (el: IComponent) => el.component.includes(action.payload)
      )
      const draggedIndex: number = state.placeholderComponents.findIndex(
        (el: IComponent) => el.component.includes(state.currentDraggedComponent)
      )
      return {
        ...state,
        placeholderComponents: [...state.placeholderComponents].map(
          (el: IComponent) => {
            if (el.component.includes(action.payload)) {
              return { ...el, order: draggedIndex }
            }
            if (el.component.includes(state.currentDraggedComponent)) {
              return { ...el, order: droppedIndex }
            }
            return el
          }
        ),
      }
    default:
      return state
  }
}
