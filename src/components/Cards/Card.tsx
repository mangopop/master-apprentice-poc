import ICard from '../../interfaces/card'
import './Card.css'
import { BsTriangle } from 'react-icons/bs'
import { BsSquare } from 'react-icons/bs'
import { BsCircle } from 'react-icons/bs'

function Card({
  card,
  cardActionCallback,
  duplicateCardType,
  cardsDisabled,
}: {
  card: ICard
  cardActionCallback: Function
  duplicateCardType?: Boolean
  cardsDisabled?: Boolean
}) {
  return (
    <div
      className={`Card ${card.element} ${
        cardsDisabled || card.disabled ? 'Disabled' : ''
      } ${duplicateCardType ? 'tooltip' : ''}`}
      data-disabled={cardsDisabled || card.disabled || duplicateCardType}
      style={{ marginRight: '5px' }}
      onClick={() => cardActionCallback(card)}
    >
      <h4>{card.name}</h4>
      <h5>
        {card.type === 'dwarf' && <BsSquare />}
        {card.type === 'human' && <BsTriangle />}
        {card.type === 'elf' && <BsCircle />}
      </h5>
      <p>{card.description}</p>
      {duplicateCardType && (
        <span className={`${duplicateCardType ? 'tooltiptext' : ''}`}>
          You can only play one weapon
        </span>
      )}
    </div>
  )
}

export default Card
