import AllCards from './AllCards'
import Card from './card/Card'
import './card/Card.css'
import ICard from '../../interfaces/card'
import { shuffle } from '../../services/utilities.service'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ChooseCard({
  strength,
  magic,
  ownedCards,
  setOwnedCardsHandler,
}: {
  strength?: number
  magic?: number
  ownedCards: Array<ICard>
  setOwnedCardsHandler: Function
}) {
  const navigate = useNavigate()
  const [cardsToPick, setCardsToPick] = useState<ICard[]>([])
  const ownedCardsNameArray = ownedCards.map((card) => card.name)

  function canHaveCard(
    cardStrength = 0,
    cardMagic = 0,
    strength = 0,
    magic = 0
  ) {
    return cardStrength <= strength && cardMagic <= magic
  }

  const remainingCards = AllCards.filter(
    (card) =>
      !ownedCardsNameArray.includes(card.name) &&
      canHaveCard(
        card.requirements.strength,
        card.requirements.magic,
        strength,
        magic
      )
  )

  useEffect(() => {
    setCardsToPick(remainingCards.slice(0, 3))
  }, [])

  shuffle(remainingCards)

  function pickCard(card: ICard) {
    // owned card will change in props
    setOwnedCardsHandler((ownedCards: Array<ICard>) => [...ownedCards, card])
    setCardsToPick(cardsToPick.filter((cardTP) => cardTP !== card))

    // TODO if level 5 change to talisman

    navigate('/battle')
  }

  return (
    <div>
      <h1>Choose a Card</h1>
      <div className="CardContainer">
        {cardsToPick.length > 0 &&
          cardsToPick.map((card) => {
            return (
              <Card
                key={card.name}
                card={card}
                cardActionCallback={() => pickCard(card)}
              />
            )
          })}
      </div>
      {/* <Link to={`/battle`}>Fight!</Link> */}

      <h1>Cards owned</h1>
      <div className="CardContainer">
        {ownedCards.length > 0 &&
          ownedCards.map((card) => {
            return <Card key={card.name} card={card} />
          })}
      </div>

      <h1>All Cards</h1>
      <div className="CardContainer">
        {AllCards.length > 0 &&
          AllCards.map((card) => {
            return <Card key={card.name} card={card} />
          })}
      </div>
    </div>
  )
}

export default ChooseCard
