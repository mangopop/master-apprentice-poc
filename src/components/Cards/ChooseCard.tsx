import { Link } from 'react-router-dom'
import AllCards from './AllCards'
import Card from './Card'
import './Card.css'
import ICard from '../../interfaces/card'
import { shuffle } from '../../services/utilities'

function ChooseCard({ ownedCards }: { ownedCards: Array<ICard> }) {
  const ownedCardsNameArray = ownedCards.map((card) => card.name)
  const remainingCards = AllCards.filter(
    (card) => !ownedCardsNameArray.includes(card.name)
  )
  shuffle(remainingCards)
  const cardsToPick = remainingCards.slice(0, 3)

  function pickCard() {
    // add to owned cards
  }

  return (
    <div>
      <h1>Choose Card</h1>
      <div className="CardContainer">
        {cardsToPick.length > 0 &&
          cardsToPick.map((card) => {
            return (
              <Card key={card.name} card={card} cardActionCallback={pickCard} />
            )
          })}
      </div>
      <Link to={`/battle`}>Fight!</Link>
    </div>
  )
}

export default ChooseCard
