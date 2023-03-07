import React, { FC } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'

interface EqualsButtonProps {
  draggable: boolean
}

const EqualsButton: FC<EqualsButtonProps> = ({ draggable }) => {
  return (
    <div
      className="equals"
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        dragStartHandler(e, 'EqualsButton')
      }
    >
      <button>=</button>
    </div>
  )
}

export default EqualsButton
