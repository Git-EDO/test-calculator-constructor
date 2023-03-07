import React, { FC } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'

interface NumbersButtonsProps {
  draggable: boolean
}

const NumbersButtons: FC<NumbersButtonsProps> = ({ draggable }) => {
  return (
    <div
      className="numbers"
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        dragStartHandler(e, 'NumbersButtons')
      }
    >
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>0</button>
      <button>,</button>
    </div>
  )
}

export default NumbersButtons
