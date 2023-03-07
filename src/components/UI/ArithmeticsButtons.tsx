import React, { FC } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'

interface ArithmeticsButtonsProps {
  draggable: boolean
}

const ArithmeticsButtons: FC<ArithmeticsButtonsProps> = ({ draggable }) => {
  return (
    <div
      className="arithmetics"
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        dragStartHandler(e, 'ArithmeticsButtons')
      }
    >
      <button>/</button>
      <button>X</button>
      <button>-</button>
      <button>+</button>
    </div>
  )
}

export default ArithmeticsButtons
