import React, { FC, useState } from 'react'
import { dragStartHandler } from '../../utils/dragFuncs'

interface DisplayProps {
  draggable: boolean
}

const Display: FC<DisplayProps> = ({ draggable }) => {
  return (
    <div
      className="display-wrapper"
      draggable={draggable}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        dragStartHandler(e, 'Display')
      }
    >
      <div className="display">0</div>
    </div>
  )
}

export default Display
