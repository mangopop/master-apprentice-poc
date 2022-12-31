import ITalismanCard from '../../../interfaces/talismanCard'
import './../card/Card.css'

function TalismanCard({
  card,
  cardActionCallback,
  duplicateCardType,
  cardsDisabled,
}: {
  card: ITalismanCard
  cardActionCallback?: Function
  duplicateCardType?: Boolean
  cardsDisabled?: Boolean
}) {
  // let classNames = `${duplicateCardType ? 'tooltip' : ''}`

  return (
    <div
      className={`Card`}
      data-disabled={cardsDisabled || duplicateCardType}
      style={{ marginRight: '5px' }}
      onClick={() =>
        !cardsDisabled && cardActionCallback ? cardActionCallback(card) : null
      }
    >
      <h4>{card.name}</h4>
      <p>{card.description}</p>
    </div>
  )
}

export default TalismanCard
