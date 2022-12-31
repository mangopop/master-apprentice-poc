import AllCards from './TalismanCards'
import TalismanCard from './TalismanCard'
import ITalismanCard from '../../../interfaces/talismanCard'
import './../card/Card.css'
import { shuffle } from '../../../services/utilities.service'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function ChooseTalismanCard({
  ownedCards,
  setOwnedCardsHandler,
}: {
  ownedCards: Array<ITalismanCard>
  setOwnedCardsHandler: Function
  level: number
}) {
  const navigate = useNavigate()
  const [cardsToPick, setCardsToPick] = useState<ITalismanCard[]>([])
  const ownedCardsNameArray = ownedCards.map((card) => card.name)

  const remainingCards = AllCards.filter(
    (card) => !ownedCardsNameArray.includes(card.name)
  )

  useEffect(() => {
    setCardsToPick(remainingCards.slice(0, 3))
  }, [])

  shuffle(remainingCards)

  function pickCard(card: ITalismanCard) {
    // TODO this should trigger app function
    setOwnedCardsHandler((ownedCards: Array<ITalismanCard>) => [
      ...ownedCards,
      card,
    ])
    setCardsToPick(cardsToPick.filter((cardTP) => cardTP !== card))

    navigate('/battle')
  }

  return (
    <div>
      <h1>Choose a Card</h1>
      <div className="CardContainer">
        {cardsToPick.length > 0 &&
          cardsToPick.map((card) => {
            return (
              <TalismanCard
                key={card.name}
                card={card}
                cardActionCallback={() => pickCard(card)}
              />
            )
          })}
      </div>

      <h1>Cards owned</h1>
      <div className="CardContainer">
        {ownedCards.length > 0 &&
          ownedCards.map((card) => {
            return <TalismanCard key={card.name} card={card} />
          })}
      </div>

      <Link to={`/battle`}>Skip Card</Link>
    </div>
  )
}

export default ChooseTalismanCard
