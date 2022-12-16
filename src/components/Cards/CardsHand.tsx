import '../../tooltip.css'
import './Card.css'
import ICharacter from '../../interfaces/character'
import ICard from '../../interfaces/card'
import ICardHandProps from '../../interfaces/cardHandProps'
import cardPickUp from './../../sounds/cardPickUp.mp3'
import { useSound } from 'use-sound'
import { useEffect, useState } from 'react'
import { BsTriangle } from 'react-icons/bs'
import { BsSquare } from 'react-icons/bs'
import { BsCircle } from 'react-icons/bs'
import Card from './Card'

// TODO this ends as list view and prop drill medium
function CardsHand({
  arena,
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
  // TODO checkout useCallback technique out.
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

    let arenaBoost = { agility: 1, other: 1 }

    if (card.type === arena.type) {
      arenaBoost = { agility: 0.9, other: 1.25 }
    }

    // TODO could be better logic
    cardsUsed.forEach((cardUsed) => {
      if (cardUsed.hasOwnProperty('weapon') && card.hasOwnProperty('weapon')) {
        duplicatePlay = true
        setDuplicateCardType(true)
      }
    })

    if (card.agility) {
      const thing = 'test'
    }

    if (duplicatePlay) {
      return
    }

    cardPickupPlay()

    setCardsUsedHandler((cardsUsed: Array<ICard>) => [...cardsUsed, card])

    // TODO remove cardsInHand from view instead of disabling

    // function calculateSkill(
    //   cardSkill: number,
    //   playerSkill: number,
    //   arenaBoostSKill: number
    // ) {
    //   cardSkill
    //     ? Math.round((playerSkill + cardSkill) * arenaBoostSKill)
    //     : playerSkill
    // }

    // this is adding permanently (handled)
    const update = (player: ICharacter, card: ICard) => {
      return {
        ...player,
        agility: card.agility
          ? Math.round((player.agility + card.agility) * arenaBoost.agility)
          : player.agility,
        attack: card.attack
          ? Math.round((player.attack + card.attack) * arenaBoost.other)
          : player.attack,
        strength: card.strength
          ? Math.round((player.strength + card.strength) * arenaBoost.other)
          : player.strength,
        defence: card.defence
          ? Math.round((player.defence + card.defence) * arenaBoost.other)
          : player.defence,
        life: card.life
          ? (player.life + card.life) * arenaBoost.other
          : player.life,
        stamina: card.stamina
          ? Math.round((player.stamina + card.stamina) * arenaBoost.other)
          : player.stamina,
        weapon: card.weapon ? card.weapon * arenaBoost.other : player.weapon,
        armour: card.armour ? card.armour * arenaBoost.other : player.armour,
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
              // <div
              //   className={'Card Disabled'}
              //   data-disabled={true}
              //   key={card.name}
              //   style={{ marginRight: '5px' }}
              //   onClick={() => playCard(card)}
              // >
              //   <h4>{card.name}</h4>
              //   <p>{card.description}</p>
              // </div>
              <Card
                card={card}
                duplicateCardType={duplicateCardType}
                cardsDisabled={cardsDisabled}
                cardActionCallback={playCard}
              />
            )
          })}
      </div>

      <h3>Playing Cards</h3>
      <div className="CardContainer">
        {cardsInHand.length > 0 &&
          cardsInHand.map(function (card: ICard) {
            return (
              <Card
                key={card.name}
                card={card}
                duplicateCardType={duplicateCardType}
                cardsDisabled={cardsDisabled}
                cardActionCallback={playCard}
              />
            )
          })}
      </div>
    </div>
  )
}

export default CardsHand
