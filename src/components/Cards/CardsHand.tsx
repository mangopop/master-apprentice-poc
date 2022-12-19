import '../../tooltip.css'
import './card/Card.css'
import ICharacter from '../../interfaces/character'
import ICard from '../../interfaces/card'
import ICardHandProps from '../../interfaces/cardHandProps'
import cardPickUp from './../../sounds/cardPickUp.mp3'
import { useSound } from 'use-sound'
import { useEffect, useState } from 'react'
import Card from './card/Card'
import { updateWeapon } from '../../services/cardHand.service'

// TODO too many props - all because of state
function CardsHand({
  arena,
  cardsInHand,
  player,
  cardsDisabled,
  cardsUsed,
  setPlayerHandler,
  setMonsterHandler,
  stopMonsterTimersHandler,
  startMonsterTimersHandler,
  setCardsUsedHandler,
}: ICardHandProps) {
  const [duplicateCardType, setDuplicateCardType] = useState(false)
  const [spellTimer, setSpellTimer] = useState<NodeJS.Timer>()
  const [card, setCard] = useState<ICard>()
  let spellTimerId = null

  console.log('render cards hand')

  useEffect(() => {
    if (spellTimer) {
      setTimeout(() => {
        clearInterval(spellTimer)
      }, card?.duration)
    }

    return () => {
      // clearTimeout();
    }
  }, [spellTimer])

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

    setCard(card)

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

    if (duplicatePlay) {
      return
    }

    cardPickupPlay()

    setCardsUsedHandler((cardsUsed: Array<ICard>) => [...cardsUsed, card])

    // TODO remove cardsInHand from view instead of disabling
    // this is adding permanently (handled - where?)
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
        weapon: updateWeapon(
          card,
          cardsUsed,
          arenaBoost.other,
          player.weapon,
          card.weapon,
          card.weaponBonus
        ), // card.weapon ? card.weapon * arenaBoost.other : player.weapon,
        armour: card.armour ? card.armour * arenaBoost.other : player.armour,
      }
    }

    // TODO going to have lot's of function here...
    // how can we move these into the card objects

    // pause the attack for 5 seconds
    if (card.duration && card.element === 'ice') {
      stopMonsterTimersHandler()
      setTimeout(() => {
        startMonsterTimersHandler()
      }, card.duration)
    }

    // TODO - TEST - would be extremely helpful to have this tested.
    if (card.duration && card.element === 'fire') {
      spellTimerId = setInterval(() => {
        setMonsterHandler((monster) => {
          return {
            ...monster,
            life: card.durationDamage
              ? monster.life - card.durationDamage
              : monster.life,
          }
        })
      }, 2000) // can hardcode the interval for now.

      setSpellTimer(spellTimerId)
    }

    // TODO only running 1 type of card might want to run 2?
    if (card.damage) {
      setMonsterHandler((monster) => {
        return {
          ...monster,
          life: card.damage ? monster.life - card.damage : monster.life,
        }
      })
    } else {
      setPlayerHandler(update(player, card))
    }

    card.init()
  }

  return (
    <div>
      <h3>Active cards</h3>

      <div className="CardContainer">
        {cardsUsed.length > 0 &&
          cardsUsed.map(function (card: ICard) {
            return (
              <Card
                key={card.name}
                card={card}
                duplicateCardType={duplicateCardType}
                cardsDisabled={cardsDisabled}
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
