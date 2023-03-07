import React, { FC, useState } from 'react'
import { ReactComponent as RuntimeIcon } from '../assets/runtime-icon.svg'
import { ReactComponent as ConstructorIcon } from '../assets/constructor-icon.svg'

const HeaderButtons: FC = () => {
  const [isConstruction, setIsConstruction] = useState<boolean>(true)

  const toggleMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsConstruction(!isConstruction)
  }

  return (
    <div className="header-buttons">
      <div className="header-buttons-wrapper">
        <button onClick={toggleMode} className={isConstruction ? '' : 'active'}>
          <RuntimeIcon />
          Runtime
        </button>
        <button onClick={toggleMode} className={isConstruction ? 'active' : ''}>
          <ConstructorIcon />
          Constructor
        </button>
      </div>
    </div>
  )
}

export default HeaderButtons
