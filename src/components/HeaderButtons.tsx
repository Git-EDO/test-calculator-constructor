import React, { FC, useState } from 'react'
import { ReactComponent as RuntimeIcon } from '../assets/runtime-icon.svg'
import { ReactComponent as ConstructorIcon } from '../assets/constructor-icon.svg'
import { useDispatch } from 'react-redux'
import { constructorModeOn, runtimeModeOn } from '../redux/actionsCreator'

const HeaderButtons: FC = () => {
  const dispatch = useDispatch()
  const [isConstruction, setIsConstruction] = useState<boolean>(true)

  const constructorMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isConstruction) {
      setIsConstruction(true)
      dispatch(constructorModeOn())
    }
  }
  const runtimeMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isConstruction) {
      setIsConstruction(false)
      dispatch(runtimeModeOn())
    }
  }

  return (
    <div className="header-buttons">
      <div className="header-buttons-wrapper">
        <button
          onClick={runtimeMode}
          className={isConstruction ? '' : 'active'}
        >
          <RuntimeIcon />
          Runtime
        </button>
        <button
          onClick={constructorMode}
          className={isConstruction ? 'active' : ''}
        >
          <ConstructorIcon />
          Constructor
        </button>
      </div>
    </div>
  )
}

export default HeaderButtons
