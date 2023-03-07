import Display from './UI/Display'
import ArithmeticsButtons from './UI/ArithmeticsButtons'
import NumbersButtons from './UI/NumbersButtons'
import EqualsButton from './UI/EqualsButton'

const Calculator = () => {
  return (
    <div className="calculator">
      <Display draggable />
      <ArithmeticsButtons draggable />
      <NumbersButtons draggable />
      <EqualsButton draggable />
    </div>
  )
}

export default Calculator
