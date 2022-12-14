import ICharacter from '../../interfaces/character'
import ICard from '../../interfaces/card'
import './Card.css'
import ICardHandProps from '../../interfaces/cardHandProps'
import cardPickUp from './../../sounds/cardPickUp.mp3'
import { useSound } from 'use-sound'
import { useEffect, useState } from 'react'
import '../../tooltip.css'

// TODO this ends as list view and prop drill medium
function CardsHand({
  cardsInHand,
  setPlayerHandler,
  cardsDisabled,
  cardsUsed,
  setCardsUsedHandler,
  player,
}: ICardHandProps) {
  const [duplicateCardType, setDuplicateCardType] = useState(false)
  console.log('render cards hand')

  useEffect(() => {}, [duplicateCardType])
  // TODO check useCallback technique out.
  //   const handleInputChange = useCallback(
  //     (event) => {
  //       setPlayerHandler((player) => {
  //         return {
  //           ...player,
  //           agility: player.agility + 300,
  //         }
  //       })
  //     },
  //     [onNameChange]
  //   )

  const [cardPickupPlay] = useSound(cardPickUp, { volume: 0.5 })

  let duplicatePlay = false

  function playCard(card: ICard) {
    if (card.disabled || cardsDisabled || duplicatePlay) {
      return
    }

    // TODO could be better logic
    cardsUsed.forEach((cardUsed) => {
      if (cardUsed.hasOwnProperty('weapon') && card.hasOwnProperty('weapon')) {
        duplicatePlay = true
        setDuplicateCardType(true)
      }
    })

    if (duplicatePlay) {
      return
    }

    cardPickupPlay()

    setCardsUsedHandler((cardsUsed: Array<ICard>) => [...cardsUsed, card])

    // TODO remove cardsInHand from view instead of disabling

    // this is adding permanently (handled)
    const update = (player: ICharacter, card: ICard) => {
      return {
        ...player,
        agility: player.agility + card.agility || player.agility,
        attack: player.attack + card.attack || player.attack,
        strength: player.strength + card.strength || player.strength,
        defence: player.defence + card.defence || player.defence,
        life: player.life + card.life || player.life,
        stamina: player.stamina + card.stamina || player.stamina,
        weapon: card.weapon || player.weapon,
        armour: card.armour || player.armour,
      }
    }

    setPlayerHandler(update(player, card))
    card.init()
  }

  return (
    <div>
      <h3>Active cards</h3>

      <div className="CardContainer">
        {cardsUsed.length > 0 &&
          cardsUsed.map(function (card: ICard) {
            return (
              <div
                className={'Card Disabled'}
                data-disabled={true}
                key={card.name}
                style={{ marginRight: '5px' }}
                onClick={() => playCard(card)}
              >
                <h4>{card.name}</h4>
                <p>{card.description}</p>
              </div>
            )
          })}
      </div>

      <h3>Playing Cards</h3>
      <div className="CardContainer">
        {cardsInHand.length > 0 &&
          cardsInHand.map(function (card: ICard) {
            return (
              <div
                className={`Card ${
                  cardsDisabled || card.disabled ? 'Disabled' : ''
                } ${duplicateCardType ? 'tooltip' : ''}`}
                data-disabled={
                  cardsDisabled || card.disabled || duplicateCardType
                }
                key={card.name}
                style={{ marginRight: '5px' }}
                onClick={() => playCard(card)}
              >
                <h4>{card.name}</h4>
                <h5>{card.type && <span>type: {card.type}</span>}</h5>
                <p>{card.description}</p>
                {duplicateCardType && (
                  <span className={`${duplicateCardType ? 'tooltiptext' : ''}`}>
                    You can only play one weapon
                  </span>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CardsHand
