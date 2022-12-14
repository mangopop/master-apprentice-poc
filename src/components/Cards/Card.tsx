import ICharacter from '../../interfaces/character'
import ICard from '../../interfaces/card'
import './Card.css'
import ICardHandProps from '../../interfaces/cardHandProps'
import cardPickUp from './../../sounds/cardPickUp.mp3'
import { useSound } from 'use-sound'

function Card({
  cardsInHand,
  setPlayerHandler,
  cardsDisabled,
  cardsUsed,
  setCardsUsedHandler,
  player,
}: ICardHandProps) {
  const [cardPickupPlay] = useSound(cardPickUp, { volume: 0.5 })

  function playCard(card: ICard) {
    if (card.disabled || cardsDisabled) {
      return
    }

    let duplicatePlay = false

    cardPickupPlay()

    // might not have recent changes
    cardsUsed.forEach((cardUsed) => {
      if (cardUsed.hasOwnProperty('weapon') && card.hasOwnProperty('weapon')) {
        duplicatePlay = true
      }
    })

    if (duplicatePlay) {
      return
    }

    setCardsUsedHandler((cardsUsed: Array<ICard>) => [...cardsUsed, card])

    // TODO remove cardsInHand from view instead of disabling

    // was one behind
    // if (cardsUsed === 3) {
    //   setCardsDisabledHandler(true)
    //   return
    // }

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
    <div className="CardContainer">
      {cardsInHand.length > 0 &&
        cardsInHand.map(function (card: ICard) {
          return (
            <div
              className={`Card ${
                cardsDisabled || card.disabled ? 'Disabled' : ''
              }`}
              data-disabled={cardsDisabled || card.disabled}
              key={card.name}
              style={{ marginRight: '5px' }}
              onClick={() => playCard(card)}
            >
              <h4>{card.name}</h4>
              <h5>{card.type && <span>type: {card.type}</span>}</h5>
              <p>{card.description}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Card
